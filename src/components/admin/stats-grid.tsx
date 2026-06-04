'use client';

import { FileText, Eye, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { AnimatedSection } from '@/components/ui/animated-section';

interface StatsGridProps {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  avgViews: number;
}

export function StatsGrid({
  totalPosts,
  publishedPosts,
  draftPosts,
  totalViews,
  avgViews,
}: StatsGridProps) {
  const stats = [
    {
      title: 'Total Posts',
      value: totalPosts,
      change:
        publishedPosts > 0 ? `${publishedPosts} published, ${draftPosts} drafts` : 'No posts yet',
      changeType: 'neutral' as const,
      icon: FileText,
    },
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      change: avgViews > 0 ? `${avgViews} avg per post` : 'No views yet',
      changeType: 'positive' as const,
      icon: Eye,
    },
    {
      title: 'Avg Views/Post',
      value: avgViews.toLocaleString(),
      change: 'Last 30 days',
      changeType: 'neutral' as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <AnimatedSection key={stat.title} delay={index * 0.1}>
          <StatsCard {...stat} index={index} />
        </AnimatedSection>
      ))}
    </div>
  );
}
