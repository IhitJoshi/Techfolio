'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, Search, X } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  views: number;
  content: string;
  tags: string;
  coverImage?: string;
  featured?: boolean;
}

interface BlogListProps {
  posts: Post[];
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function BlogList({ posts }: BlogListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = searchParams.get('q') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const filteredPosts = posts.filter((post) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.toLowerCase().includes(lowerQuery)
    );
  });

  const popularPosts = [...posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const uniqueTags = Array.from(
    new Set(
      posts
        .flatMap((p) => (p.tags ? p.tags.split(',') : []))
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    )
  ).slice(0, 10);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <header className="mb-12 border-b border-border pb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
          Journal
        </h1>
        <p className="text-lg text-muted-foreground font-sans font-light">
          Engineering. Systems. Observations.
        </p>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Articles List */}
        <div className="lg:col-span-8 space-y-2">
          {filteredPosts.length > 0 ? (
            <div className="divide-y divide-border/40">
              {filteredPosts.map((post, index) => {
                const readingTime = calculateReadingTime(post.content);
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="py-8 first:pt-0 last:pb-0 group"
                  >
                    <Link href={`/blog/${post.slug}`} className="flex gap-6 sm:gap-8 items-start justify-between">
                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        {/* Meta information */}
                        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground/60">
                          <span>{formatDate(post.createdAt)}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views.toLocaleString()} views
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-2 leading-snug tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Bottom Info Bar */}
                        <div className="flex items-center gap-4">
                          {post.tags && (
                            <span className="text-[10px] tracking-wider uppercase font-semibold text-accent px-2 py-0.5 bg-accent/5 rounded border border-accent/10">
                              {post.tags.split(',')[0].trim()}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground/60">
                            {readingTime} min read
                          </span>
                        </div>
                      </div>

                      {/* Thumbnail Cover Image */}
                      {post.coverImage && (
                        <div className="relative w-24 h-16 sm:w-36 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted border border-border/40">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      )}
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/10 rounded-2xl border border-dashed border-border/60">
              <p className="text-lg font-display text-muted-foreground mb-2">
                No articles found matching "{query}"
              </p>
              <p className="text-sm text-muted-foreground/60 font-light mb-6">
                Try checking for typos or searching for a different keyword.
              </p>
              <button
                onClick={clearSearch}
                className="px-4 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Right: Sidebar Widgets */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stories..."
              value={query}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-8 py-2.5 bg-muted/30 hover:bg-muted/50 focus:bg-background border border-border/60 focus:border-foreground/30 rounded-xl text-sm focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/50"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full hover:bg-muted/80 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Popular Stories Widget */}
          {popularPosts.length > 0 && (
            <div className="bg-secondary/40 border border-border/40 rounded-2xl p-6">
              <h3 className="font-display font-bold text-base mb-4 text-foreground">
                Popular Stories
              </h3>
              <ul className="space-y-4">
                {popularPosts.map((post) => (
                  <li key={post.id} className="group">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <span className="text-[10px] text-muted-foreground/60 block mb-1">
                        {formatDate(post.createdAt)}
                      </span>
                      <h4 className="text-sm font-semibold leading-snug text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Topics Tag Cloud Widget */}
          {uniqueTags.length > 0 && (
            <div className="bg-secondary/40 border border-border/40 rounded-2xl p-6">
              <h3 className="font-display font-bold text-base mb-4 text-foreground">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map((tag) => {
                  const isSelected = query.toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        if (isSelected) {
                          params.delete('q');
                        } else {
                          params.set('q', tag);
                        }
                        router.replace(`${pathname}?${params.toString()}`);
                      }}
                      className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${
                        isSelected
                          ? 'bg-foreground text-background border-foreground font-medium'
                          : 'bg-background hover:bg-muted text-muted-foreground/80 border-border/60'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}