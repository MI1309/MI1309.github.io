import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const archivePath = path.join(process.cwd(), 'data', 'archive.json');

function getToken(request) {
  return request.cookies.get('mi_auth')?.value;
}

export async function GET() {
  try {
    const data = fs.readFileSync(archivePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    const token = getToken(request);
    const jwtSecret = process.env.JWT_SECRET;

    if (!token || !jwtSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(token, jwtSecret);
    const data = await request.json();

    if (!data) {
      return NextResponse.json({ error: 'No data' }, { status: 400 });
    }

    const githubRepo = process.env.GITHUB_REPO;
    const githubPat = process.env.GITHUB_PAT;
    if (githubRepo && githubPat) {
      const payload = { archive: data };
      const [owner, repo] = githubRepo.split('/');
      const body = JSON.stringify({ event_type: 'update-archive', client_payload: payload });
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
        const details = await response.text();
        return NextResponse.json({ error: 'GitHub dispatch failed', details }, { status: 500 });
      }

      return NextResponse.json({ success: true, dispatched: true });
    }

    fs.mkdirSync(path.dirname(archivePath), { recursive: true });
    fs.writeFileSync(archivePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true, dispatched: false });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token or failed to save' }, { status: 401 });
  }
}
