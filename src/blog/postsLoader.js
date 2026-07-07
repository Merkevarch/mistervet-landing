import matter from 'gray-matter';

// Importar todos los archivos .md de la carpeta posts
const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts() {
  const posts = [];

  for (const [path, rawContent] of Object.entries(postFiles)) {
    const content = rawContent;
    const { data, content: body } = matter(content);
    const slug = path.split('/').pop().replace('.md', '');

    posts.push({
      slug,
      title: data.title || 'Sin título',
      date: data.date || new Date().toISOString(),
      category: data.category || 'General',
      author: data.author || 'MisterVet',
      excerpt: data.excerpt || '',
      content: body,
    });
  }

  // Ordenar por fecha descendente
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}
