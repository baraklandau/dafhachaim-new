import { NextRequest, NextResponse } from 'next/server';
import https from 'node:https';

// Proxy PDF downloads from the Rackspace server.
// The Rackspace server has an untrusted SSL cert, so browsers can't reach it
// directly. Vercel fetches it server-side (bypassing the cert check) and
// streams it back to the browser over our trusted dafhachaim.org connection.

function fetchFromRackspace(url: string): Promise<{ buffer: Buffer; contentType: string; contentDisposition: string }> {
  return new Promise((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => resolve({
        buffer: Buffer.concat(chunks),
        contentType: res.headers['content-type'] || 'application/octet-stream',
        contentDisposition: res.headers['content-disposition'] || 'attachment',
      }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const url = `https://198.101.226.202/api/dappim/${path.join('/')}`;

  try {
    const { buffer, contentType, contentDisposition } = await fetchFromRackspace(url);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch PDF from server' }, { status: 502 });
  }
}
