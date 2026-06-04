export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
  views: number;
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface DashboardStats {
  totalPosts: number;
  totalViews: number;
  engagementRate: number;
  averageReadTime: number;
  topPost: BlogPost | null;
  recentViews: { date: string; views: number }[];
}
