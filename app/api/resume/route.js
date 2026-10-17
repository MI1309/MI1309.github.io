import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const resumeFilePath = path.join(process.cwd(), 'public', 'resume.pdf');
const resumeManifestPath = path.join(process.cwd(), 'data', 'resume.json');
const MAX_RESUME_BYTES = 3 * 1024 * 1024;

function getToken(request) {
  return request.cookies.get('mi_auth')?.value;
}

function saveResumeLocally(update) {
  const manifest = {
    available: update.action === 'upload',
    filename: 'resume.pdf',
  };

  fs.mkdirSync(path.dirname(resumeFilePath), { recursive: true });
  fs.mkdirSync(path.dirname(resumeManifestPath), { recursive: true });

  if (update.action === 'upload') {
    const temporaryPdfPath = `${resumeFilePath}.tmp`;
    fs.writeFileSync(temporaryPdfPath, Buffer.from(update.content, 'base64'));
    fs.renameSync(temporaryPdfPath, resumeFilePath);
  } else {
    fs.rmSync(resumeFilePath, { force: true });
  }

  const temporaryManifestPath = `${resumeManifestPath}.tmp`;
  fs.writeFileSync(temporaryManifestPath, JSON.stringify(manifest, null, 2));
  fs.renameSync(temporaryManifestPath, resumeManifestPath);
}

export async function GET() {
  try {
    const file = fs.readFileSync(resumeManifestPath, 'utf8');
    return NextResponse.json(JSON.parse(file), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    return NextResponse.json({ available: false, filename: 'resume.pdf' }, {
      headers: { 'Cache-Control': 'no-store' },
      status: 200,
    });
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
    const { action, content } = await request.json();

    if (action === 'delete') {
      const githubRepo = process.env.GITHUB_REPO;
      const githubPat = process.env.GITHUB_PAT;
      if (!githubRepo || !githubPat) {
        saveResumeLocally({ action: 'delete' });
        return NextResponse.json({ success: true, dispatched: false });
      }

      const payload = { resume: { action: 'delete' } };
      const [owner, repo] = githubRepo.split('/');
      const body = JSON.stringify({ event_type: 'update-resume', client_payload: payload });
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
        method: 'POST',
        headers: {
          'User-Agent': 'mi1309-admin',
          'Accept': 'application/vnd.github+json',
          'Authorization': `token ${githubPat}`,
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        return NextResponse.json({ error: 'Pembaruan resume gagal dikirim ke GitHub.' }, { status: 500 });
      }

      return NextResponse.json({ success: true, dispatched: true });
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

    const githubRepo = process.env.GITHUB_REPO;
    const githubPat = process.env.GITHUB_PAT;
    if (!githubRepo || !githubPat) {
      saveResumeLocally({ action: 'upload', content });
      return NextResponse.json({ success: true, dispatched: false });
    }

    const payload = { resume: { action: 'upload', content: pdf.toString('base64') } };
    const [owner, repo] = githubRepo.split('/');
    const body = JSON.stringify({ event_type: 'update-resume', client_payload: payload });
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
      method: 'POST',
      headers: {
        'User-Agent': 'mi1309-admin',
        'Accept': 'application/vnd.github+json',
        'Authorization': `token ${githubPat}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Pembaruan resume gagal dikirim ke GitHub.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, dispatched: true });
  } catch (error) {
    return NextResponse.json({ error: 'Perubahan resume gagal disimpan.' }, { status: 500 });
  }
}
