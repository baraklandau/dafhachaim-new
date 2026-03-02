import { NextRequest, NextResponse } from 'next/server';
import https from 'node:https';
import http from 'node:http';

// Proxy PDF downloads from the Rackspace server.
// The Rackspace server has an untrusted SSL cert, so browsers can't reach it
// directly. Vercel fetches it server-side (bypassing the cert check) and
// streams it back to the browser over our trusted dafhachaim.org connection.
// Redirects are followed automatically.

type FetchResult = { buffer: Buffer; contentType: string; contentDisposition: string };

function fetchFromRackspace(url: string, hops = 0): Promise<FetchResult> {
  if (hops > 5) return Promise.reject(new Error('Too many redirects'));

  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      rejectUnauthorized: false,
    };

    const get = isHttps ? https.get : http.get;

    get(options as Parameters<typeof https.get>[0], (res) => {
      // Follow redirects
      if (res.statusCode && [301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : `${urlObj.origin}${res.headers.location}`;
        res.resume(); // drain the redirect response body
        fetchFromRackspace(next, hops + 1).then(resolve).catch(reject);
        return;
      }

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
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch PDF from server' }, { status: 502 });
  }
}
