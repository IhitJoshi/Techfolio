import { prisma } from './prisma';
import type { Post, Prisma } from '@prisma/client';

export interface PostWithViews extends Post {
  views: number;
}

export interface AnalyticsData {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  avgViews: number;
  recentPosts: Post[];
  mostViewedPost: Post | null;
}

export interface MonthlyPostCount {
  month: string;
  count: number;
}

// Get all posts with optional filtering
export async function getPosts(options?: {
  published?: boolean;
  featured?: boolean;
  tags?: string[];
  limit?: number;
  orderBy?: Prisma.PostOrderByWithRelationInput;
}) {
  const where: Prisma.PostWhereInput = {};

  if (options?.published !== undefined) {
    where.published = options.published;
  }

  if (options?.featured !== undefined) {
    where.featured = options.featured;
  }

  if (options?.tags && options.tags.length > 0) {
    // Since tags is a comma-separated string, we use OR conditions with contains
    where.OR = options.tags.map((tag) => ({
      tags: { contains: tag },
    }));
  }

  return prisma.post.findMany({
    where,
    orderBy: options?.orderBy || { createdAt: 'desc' },
    take: options?.limit,
  });
}

// Get a single post by slug
export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

// Create a new post
export async function createPost(data: Prisma.PostCreateInput) {
  return prisma.post.create({
    data,
  });
}

// Update a post
export async function updatePost(id: string, data: Prisma.PostUpdateInput) {
  return prisma.post.update({
    where: { id },
    data,
  });
}

// Delete a post
export async function deletePost(id: string) {
  return prisma.post.delete({
    where: { id },
  });
}

// Increment post views
export async function incrementPostViews(slug: string) {
  return prisma.post.update({
    where: { slug },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

// Get analytics data for dashboard
export async function getAnalytics(): Promise<AnalyticsData> {
  const [totalPosts, publishedPosts, draftPosts, allPosts] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const totalViews = allPosts.reduce((sum, post) => sum + post.views, 0);
  const avgViews = totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;

  const recentPosts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  const mostViewedPost = await prisma.post.findFirst({
    where: { published: true },
    orderBy: { views: 'desc' },
  });

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalViews,
    avgViews,
    recentPosts,
    mostViewedPost,
  };
}

// Get monthly post counts for charts
export async function getMonthlyPostCounts(): Promise<MonthlyPostCount[]> {
  const posts = await prisma.post.findMany({
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const monthCounts = new Map<string, number>();

  posts.forEach((post) => {
    const date = new Date(post.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthCounts.set(monthKey, (monthCounts.get(monthKey) || 0) + 1);
  });

  // Get last 12 months
  const result: MonthlyPostCount[] = [];
  const today = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleString('default', { month: 'short' });

    result.push({
      month: monthName,
      count: monthCounts.get(monthKey) || 0,
    });
  }

  return result;
}

// Get related posts based on tags
export async function getRelatedPosts(slug: string, tags: string, limit = 3) {
  if (!tags) return [];

  const tagArray = tags.split(',').map((t) => t.trim());

  return prisma.post.findMany({
    where: {
      slug: { not: slug },
      published: true,
      OR: tagArray.map((tag) => ({
        tags: { contains: tag },
      })),
    },
    orderBy: { views: 'desc' },
    take: limit,
  });
}
