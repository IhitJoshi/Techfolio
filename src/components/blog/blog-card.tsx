'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Eye, Calendar } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate, formatNumber } from '@/lib/blog-utils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-all duration-300 shadow-sm">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image - Fixed height */}
              <div className="relative h-64 md:h-[400px] overflow-hidden bg-gray-50">
                {post.coverImage ? (
                  <>
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-opacity duration-500" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl font-serif text-gray-400">
                        {post.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                {/* Featured Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-mono uppercase tracking-wider mb-4 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  Featured
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(
                    (typeof (post.tags as any) === 'string'
                      ? (post.tags as any).split(',').map((t: any) => t.trim())
                      : Array.isArray(post.tags)
                        ? post.tags
                        : []) as string[]
                  )
                    .slice(0, 3)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-gray-500 bg-gray-50 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-black group-hover:text-gray-500 transition-all duration-300 tracking-tight">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-500 font-sans text-base mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-sans">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(post.views)} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all duration-300 h-full flex flex-col">
          {/* Image - Fixed height */}
          <div className="relative h-48 overflow-hidden bg-gray-50">
            {post.coverImage ? (
              <>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-opacity duration-500" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl font-serif text-gray-400">
                    {post.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content - Flex grow to fill remaining space */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {(
                (typeof (post.tags as any) === 'string'
                  ? (post.tags as any).split(',').map((t: any) => t.trim())
                  : Array.isArray(post.tags)
                    ? post.tags
                    : []) as string[]
              )
                .slice(0, 2)
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-gray-500 bg-gray-50 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 text-black group-hover:text-gray-500 transition-all duration-300 line-clamp-2 tracking-tight">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-500 font-sans text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-gray-400 font-sans pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTime} min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>{formatNumber(post.views)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}