import { BlobNotFoundError, get } from '@vercel/blob';
import { NextResponse } from 'next/server';

const resumePathname = 'portfolio/resume.pdf';

export async function GET() {
  if (
    !process.env.BLOB_READ_WRITE_TOKEN &&
    !(process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN)
  ) {
    return new NextResponse('Vercel Blob belum terhubung ke project.', { status: 503 });
  }

  try {
    const result = await get(resumePathname, { access: 'public' });
    if (!result || !result.stream) {
      return new NextResponse('Resume tidak ditemukan.', { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="resume.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return new NextResponse('Resume tidak ditemukan.', { status: 404 });
    }
    console.error('Failed to read resume from Vercel Blob:', error);
    return new NextResponse('Resume tidak dapat dimuat.', { status: 500 });
  }
}