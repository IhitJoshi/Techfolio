'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/types';
import { author } from '@/lib/mock-data';
import { calculateReadingTime, formatDate } from '@/lib/blog-utils';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  coverImage?: string;
  tags?: string;
  featured: boolean;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts?published=true');
        if (response.ok) {
          const fetchedPosts: Post[] = await response.json();

          const transformedPosts: BlogPost[] = fetchedPosts.map((post) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160),
            content: post.content,
            coverImage: post.coverImage,
            author,
            publishedAt: post.createdAt,
            updatedAt: post.updatedAt,
            readingTime: calculateReadingTime(post.content),
            tags: post.tags ? post.tags.split(',').map((t) => t.trim()) : [],
            featured: post.featured,
            views: post.views,
          }));

          const topPosts = transformedPosts
            .sort((a, b) => {
              if (b.views !== a.views) return b.views - a.views;
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            })
            .slice(0, 3);

          setPosts(topPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-400 font-sans text-sm tracking-wide">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-8">
            <div className="space-y-0 divide-y divide-gray-100">
              {posts.map((post) => (
                <article key={post.id} className="group py-12 first:pt-0 last:pb-0">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex gap-8">
                      {/* Content */}
                      <div className="flex-1">
                        {/* Author & Date */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-serif font-medium">
                            {author.name.charAt(0)}
                          </div>
                          <span className="text-sm font-sans text-gray-900 font-medium">{author.name}</span>
                          <span className="text-sm text-gray-400">·</span>
                          <span className="text-sm text-gray-500 font-sans">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>

                        <h2 className="text-2xl font-serif font-bold text-black mb-2 group-hover:text-gray-500 transition-colors duration-200 line-clamp-2 tracking-tight">
                          {post.title}
                        </h2>
                        <p className="text-base text-gray-500 font-sans leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4">
                          {post.tags && post.tags.length > 0 && (
                            <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                              {post.tags[0]}
                            </span>
                          )}
                          <span className="text-xs text-gray-400 font-sans">
                            {post.readingTime} min read
                          </span>
                        </div>
                      </div>

                      {/* Image */}
                      {post.coverImage && (
                        <div className="relative w-40 h-28 flex-shrink-0">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              ))}

              <div className="pt-12 flex justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-sans font-medium text-black transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
                >
                  View More Stories
                </Link>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-20 space-y-8">
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-sm">
                <h3 className="font-serif font-bold text-black text-base mb-3 tracking-tight">About</h3>
                <p className="text-sm text-gray-500 font-sans leading-relaxed mb-4">
                  A personal blog about technology, programming, and software development. Sharing
                  insights and experiences.
                </p>
                <Link
                  href="/about"
                  className="text-sm font-sans font-medium text-black hover:text-gray-400 transition-colors duration-200 inline-block"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}