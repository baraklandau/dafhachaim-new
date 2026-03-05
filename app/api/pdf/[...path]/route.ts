import { NextRequest, NextResponse } from 'next/server';
import https from 'node:https';
import http from 'node:http';

type FetchResult = { buffer: Buffer; contentType: string; contentDisposition: string };

function fetchFromRackspace(url: string, hops = 0): Promise<FetchResult> {
  if (hops > 5) return Promise.reject(new Error('Too many redirects'));

  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port ? Number(urlObj.port) : (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      rejectUnauthorized: false,
      headers: { Host: 'dafhachaim.org' },
    };

    const handler = (res: http.IncomingMessage) => {
      if (res.statusCode && [301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : `${urlObj.protocol}//${urlObj.host}${res.headers.location}`;
        res.resume();
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
    };

    const req = isHttps ? https.get(options, handler) : http.get(options, handler);
    req.on('error', reject);
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
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch PDF from server' }, { status: 502 });
  }
}
