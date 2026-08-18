// Lightweight frontmatter parser for our markdown posts.
// Replaces gray-matter (which uses `eval` and breaks in production bundles).
//
// Supported frontmatter format (YAML subset):
// ---
// title: "Some title"
// date: "2026-07-07"
// category: "Mascotas"
// author: "MisterVet"
// excerpt: "Some excerpt"
// ---
//
// Supports: quoted strings ("..." or '...'), plain scalars, numbers, booleans.

// Importar todos los archivos .md de la carpeta posts como strings raw
const postFiles = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
}

interface Frontmatter {
  data: Record<string, unknown>;
  content: string;
}

function parseValue(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === '') return '';
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
  return trimmed;
}

function parseFrontmatter(rawContent: string): Frontmatter {
  const lines = rawContent.split(/\r?\n/);
  let startIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    if (lines[i].trim() === '---') {
      startIdx = i;
    }
    break;
  }

  if (startIdx === -1) {
    return { data: {}, content: rawContent };
  }

  let endIdx = -1;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIdx = i;
      break;
    }
  }

  if (endIdx === -1) {
    return { data: {}, content: rawContent };
  }

  const frontmatterLines = lines.slice(startIdx + 1, endIdx);
  const data: Record<string, unknown> = {};

  for (const line of frontmatterLines) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue;

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1);
    data[key] = parseValue(value);
  }

  const content = lines.slice(endIdx + 1).join('\n').replace(/^\n+/, '');

  return { data, content };
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const [path, rawContent] of Object.entries(postFiles)) {
    const { data, content: body } = parseFrontmatter(rawContent);
    const slug = path.split('/').pop()!.replace('.md', '');

    posts.push({
      slug,
      title: (data.title as string) || 'Sin título',
      date: (data.date as string) || new Date().toISOString(),
      category: (data.category as string) || 'General',
      author: (data.author as string) || 'MisterVet',
      excerpt: (data.excerpt as string) || '',
      content: body,
    });
  }

  // Ordenar por fecha descendente
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}
