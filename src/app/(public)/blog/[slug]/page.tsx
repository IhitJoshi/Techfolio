import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Eye } from 'lucide-react';
import { getPostBySlug, getPosts, incrementPostViews } from '@/lib/posts';
import { ReadingProgressBar } from '@/components/ui/reading-progress';
import { AnimatedSection } from '@/components/ui/animated-section';
import { BlogCard } from '@/components/blog/blog-card';
import { formatDate, formatNumber } from '@/lib/blog-utils';
import { ShareButtons } from '@/components/blog/share-buttons';

const author = {
  name: 'Joshi',
  role: 'Full Stack Developer',
};

export async function generateStaticParams() {
  const posts = await getPosts({ published: true });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Increment views (fire and forget)
  incrementPostViews(slug).catch(console.error);

  const relatedPosts = await getPosts({ published: true, limit: 3 });
  const filteredRelated = relatedPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2)
    .map((p) => ({
      ...p,
      excerpt: p.excerpt || '',
      coverImage: p.coverImage || undefined,
      author: {
        name: author.name,
        avatar: '/placeholder-avatar.jpg',
        bio: author.role,
        social: {},
      },
      publishedAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      readingTime: Math.ceil(p.content.split(' ').length / 200),
      tags: p.tags ? p.tags.split(',').map((t) => t.trim()) : [],
    }));

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <>
      <ReadingProgressBar />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors duration-200 font-sans text-sm tracking-wide"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 pt-8 pb-12">
        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.split(',').map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-gray-100 text-gray-600 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight tracking-tight font-bold text-black">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-serif font-medium text-sm">
              {author.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-black font-sans text-sm">{author.name}</p>
              <p className="text-xs text-gray-400 font-sans">{author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.createdAt.toISOString())}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Eye className="w-4 h-4" />
            <span>{formatNumber(post.views)} views</span>
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-sans border-l-2 border-gray-200 pl-6">
            {post.excerpt}
          </p>
        )}

        {/* Share Buttons */}
        <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <AnimatedSection className="max-w-5xl mx-auto px-6 mb-16">
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-gray-100 shadow-sm">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        </AnimatedSection>
      )}

      {/* Article Content */}
      <AnimatedSection className="max-w-3xl mx-auto px-6">
        <article className="prose prose-lg prose-gray mx-auto font-serif text-gray-800 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </AnimatedSection>

      {/* Related Posts */}
      {filteredRelated.length > 0 && (
        <AnimatedSection className="max-w-6xl mx-auto px-6 mt-24 mb-16">
          <div className="border-t border-gray-100 pt-12">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-black mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {filteredRelated.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}
    </>
  );
}