import { Link } from 'react-router-dom';
import { getAllPosts } from '../blog/postsLoader';

const categoryColors = {
  Mascotas: 'bg-mv-blue/10 text-mv-blue',
  Ganadería: 'bg-mv-amber/10 text-mv-amber',
  General: 'bg-slate-100 text-slate-600',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-display text-mv-darkblue mb-3">Blog MisterVet</h1>
          <p className="text-slate-600">Consejos y guías sobre medicina veterinaria, mascotas y producción animal</p>
        </div>
      </section>

      {/* Artículos */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${categoryColors[post.category] || categoryColors.General}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(post.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">{post.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <span className="inline-block mt-3 text-sm font-medium text-mv-blue">Leer más →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
