import { getPosts } from '@/lib/posts';
import { BlogList } from '@/components/blog/blog-list';
import { Suspense } from 'react';

export const metadata = {
  title: 'Journal | TechFolio',
  description: 'Engineering. Systems. Observations.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getPosts({
    published: true,
    orderBy: { createdAt: 'desc' },
  });

  // Serialize dates and parameters for client component
  const serializedPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    slug: post.slug,
    createdAt: post.createdAt.toISOString(),
    views: post.views,
    content: post.content,
    tags: post.tags || '',
    coverImage: post.coverImage || undefined,
    featured: post.featured,
  }));

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog List */}
        {serializedPosts.length > 0 ? (
          <Suspense
            fallback={
              <div className="text-center py-20 text-muted-foreground font-sans text-sm tracking-wide">
                Loading stories...
              </div>
            }
          >
            <BlogList posts={serializedPosts} />
          </Suspense>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-display text-muted-foreground mb-2 tracking-tight">
              No articles published yet.
            </p>
            <p className="text-base text-muted-foreground/60 font-sans font-light">Publishing soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}