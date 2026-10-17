import { head, put, del, BlobNotFoundError } from '@vercel/blob';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const resumePathname = 'portfolio/resume.pdf';
const MAX_RESUME_BYTES = 3 * 1024 * 1024;

function hasBlobCredentials() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );
}

function getToken(request) {
  return request.cookies.get('mi_auth')?.value;
}

export async function GET() {
  if (!hasBlobCredentials()) {
    return NextResponse.json(
      { error: 'Vercel Blob belum terhubung ke project.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    await head(resumePathname, { access: 'public' });
    return NextResponse.json(
      { available: true, filename: 'resume.pdf', url: '/api/resume/file' },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return NextResponse.json(
        { available: false, filename: 'resume.pdf' },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }
    console.error('Failed to read resume metadata:', error);
    return NextResponse.json(
      { error: 'Status resume gagal dibaca dari Vercel Blob.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

export async function POST(request) {
  try {
    const token = getToken(request);
    const jwtSecret = process.env.JWT_SECRET;

    if (!token || !jwtSecret) {
      return NextResponse.json({ error: 'Sesi admin tidak valid atau sudah berakhir.' }, { status: 401 });
    }

    jwt.verify(token, jwtSecret);
    if (!hasBlobCredentials()) {
      return NextResponse.json(
        { error: 'Vercel Blob belum terhubung. Buat Blob Store lalu hubungkan ke project dan environment Production.' },
        { status: 503 },
      );
    }

    const { action, content } = await request.json();

    if (action === 'delete') {
      await del(resumePathname, { access: 'public' });
      return NextResponse.json({ success: true, available: false });
    }

    if (action !== 'upload' || typeof content !== 'string') {
      return NextResponse.json({ error: 'Pilih berkas PDF untuk diunggah.' }, { status: 400 });
    }

    if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(content)) {
      return NextResponse.json({ error: 'Data berkas PDF tidak valid.' }, { status: 400 });
    }

    const pdf = Buffer.from(content, 'base64');
    if (pdf.length > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: 'Ukuran PDF maksimal 3 MB.' }, { status: 413 });
    }

    if (!pdf.subarray(0, 5).equals(Buffer.from('%PDF-'))) {
      return NextResponse.json({ error: 'Berkas yang dipilih bukan PDF yang valid.' }, { status: 400 });
    }

    await put(resumePathname, pdf, {
      access: 'public',
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: 'application/pdf',
      contentDisposition: 'inline; filename="resume.pdf"',
      cacheControlMaxAge: 60,
    });
    return NextResponse.json({
      success: true,
      available: true,
      filename: 'resume.pdf',
      url: '/api/resume/file',
    });
  } catch (error) {
    console.error('Failed to save resume to Vercel Blob:', error);
    return NextResponse.json(
      { error: 'Resume gagal disimpan ke Vercel Blob. Pastikan Blob Store sudah terhubung ke project.' },
      { status: 500 },
    );
  }
}
