import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
  return new Promise((resolve) => {
    exec('npx prisma generate', (err, stdout, stderr) => {
      if (err) {
        return resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      }
      resolve(NextResponse.json({ message: stdout }));
    });
  });
}
