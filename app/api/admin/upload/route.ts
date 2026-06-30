import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { put } from '@vercel/blob';

// Allowed MIME types → max size (MB) and folder prefix
const ALLOWED: Record<string, { maxMb: number; folder: string }> = {
  // Images
  'image/jpeg':     { maxMb: 10, folder: 'cms/img' },
  'image/png':      { maxMb: 10, folder: 'cms/img' },
  'image/webp':     { maxMb: 10, folder: 'cms/img' },
  'image/gif':      { maxMb: 10, folder: 'cms/img' },
  'image/svg+xml':  { maxMb: 5,  folder: 'cms/img' },
  // Video
  'video/mp4':      { maxMb: 500, folder: 'courses/video' },
  'video/webm':     { maxMb: 500, folder: 'courses/video' },
  'video/ogg':      { maxMb: 500, folder: 'courses/video' },
  'video/quicktime':{ maxMb: 500, folder: 'courses/video' },
  // PDF & Documents
  'application/pdf':                                                          { maxMb: 50, folder: 'courses/docs' },
  'application/msword':                                                       { maxMb: 50, folder: 'courses/docs' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':  { maxMb: 50, folder: 'courses/docs' },
  'application/vnd.ms-powerpoint':                                            { maxMb: 50, folder: 'courses/docs' },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':{ maxMb: 50, folder: 'courses/docs' },
  'application/vnd.ms-excel':                                                 { maxMb: 50, folder: 'courses/docs' },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':        { maxMb: 50, folder: 'courses/docs' },
  'text/plain':   { maxMb: 10, folder: 'courses/docs' },
  'text/csv':     { maxMb: 10, folder: 'courses/docs' },
};

function typeLabel(mime: string): string {
  if (mime.startsWith('image/')) return 'IMAGE';
  if (mime.startsWith('video/')) return 'VIDEO';
  if (mime === 'application/pdf') return 'PDF';
  return 'DOC';
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || !['admin', 'master_admin'].includes(role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const config = ALLOWED[file.type];
  if (!config) {
    return NextResponse.json(
      { error: `File type not allowed: ${file.type}. Allowed: images, video (MP4/WebM), PDF, Word, PowerPoint, Excel.` },
      { status: 400 }
    );
  }

  if (file.size > config.maxMb * 1024 * 1024) {
    return NextResponse.json({ error: `File too large (max ${config.maxMb} MB for this type)` }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
  const slug = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
  const filename = `${config.folder}/${slug}-${Date.now()}.${ext}`;

  const blob = await put(filename, file, { access: 'public' });

  return NextResponse.json({ url: blob.url, type: typeLabel(file.type), name: file.name, size: file.size });
}
