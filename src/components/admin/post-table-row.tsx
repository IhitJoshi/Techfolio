'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Edit, ExternalLink, Eye, Calendar } from 'lucide-react';
import { DeletePostButton } from './delete-post-button';
import { formatDate, formatNumber } from '@/lib/blog-utils';

interface Post {
  id: string;
  title: string;
  tags: string | null;
  createdAt: string; // ISO string
  views: number;
  content: string;
  featured: boolean;
  published: boolean;
  slug: string;
}

interface PostTableRowProps {
  post: Post;
  index: number;
}

export function PostTableRow({ post, index }: PostTableRowProps) {
  return (
    <motion.tr
      key={post.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <td className="py-4">
        <span className="font-medium group-hover:text-accent transition-colors">{post.title}</span>
        {post.tags && (
          <div className="flex gap-2 mt-1">
            {post.tags
              .split(',')
              .slice(0, 2)
              .map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground">
                  #{tag.trim()}
                </span>
              ))}
          </div>
        )}
      </td>
      <td className="py-4 text-sm text-muted-foreground hidden sm:table-cell">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {formatDate(post.createdAt)}
        </div>
      </td>
      <td className="py-4 text-sm">
        <div className="flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-muted-foreground" />
          {formatNumber(post.views)}
        </div>
      </td>
      <td className="py-4 text-sm text-muted-foreground hidden md:table-cell">
        {Math.ceil(post.content.split(' ').length / 200)} min
      </td>
      <td className="py-4">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            post.featured
              ? 'bg-emerald-500/10 text-emerald-500'
              : post.published
                ? 'bg-muted text-muted-foreground'
                : 'bg-yellow-500/10 text-yellow-500'
          }`}
        >
          {post.featured ? 'Featured' : post.published ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className="py-4">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/edit/${post.slug}`}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Edit className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </Link>
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </a>
          <DeletePostButton postId={post.id} />
        </div>
      </td>
    </motion.tr>
  );
}
