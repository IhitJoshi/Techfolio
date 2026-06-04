import {
  FileText,
  Eye,
  TrendingUp,
  BarChart3,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/animated-section';
import { getAnalytics, getMonthlyPostCounts } from '@/lib/posts';
import { formatDate, formatNumber } from '@/lib/blog-utils';
import { DeletePostButton } from '@/components/admin/delete-post-button';
import { DashboardLayoutClient } from '@/components/admin/dashboard-layout-client';
import { MonthlyChartBar } from '@/components/admin/monthly-chart-bar';
import { PostTableRow } from '@/components/admin/post-table-row';
import { StatsGrid } from '@/components/admin/stats-grid';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const analytics = await getAnalytics();
  const monthlyData = await getMonthlyPostCounts();

  // Serialize posts data for client components (convert Date to string)
  const serializedPosts = analytics.recentPosts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return (
    <DashboardLayoutClient>
      {/* Stats Grid */}
      <StatsGrid
        totalPosts={analytics.totalPosts}
        publishedPosts={analytics.publishedPosts}
        draftPosts={analytics.draftPosts}
        totalViews={analytics.totalViews}
        avgViews={analytics.avgViews}
      />

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Traffic Chart */}
        <AnimatedSection>
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl mb-1">Posts Over Time</h2>
                <p className="text-sm text-muted-foreground">Last 6 months</p>
              </div>
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>

            {monthlyData.length > 0 ? (
              <>
                <div className="flex items-end justify-between h-48 gap-2">
                  {monthlyData.map((month, index) => {
                    const maxCount = Math.max(...monthlyData.map((m) => m.count));
                    const height = maxCount > 0 ? (month.count / maxCount) * 100 : 0;

                    return (
                      <MonthlyChartBar
                        key={month.month}
                        month={month.month}
                        count={month.count}
                        maxCount={maxCount}
                        index={index}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                  {monthlyData.map((month) => (
                    <span key={month.month} className="flex-1 text-center">
                      {new Date(month.month + '-01').toLocaleDateString('en-US', {
                        month: 'short',
                      })}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-48 flex items-center justify-center text-muted-foreground">
                No posts yet
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Top Post */}
        <AnimatedSection>
          <div className="glass-card rounded-xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl mb-1">Top Performing</h2>
                <p className="text-sm text-muted-foreground">Most viewed post</p>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>

            {analytics.mostViewedPost ? (
              <div className="space-y-4">
                <h3 className="font-display text-lg leading-tight">
                  {analytics.mostViewedPost.title}
                </h3>
                <div className="flex items-center gap-2 text-2xl font-bold text-accent">
                  <Eye className="w-6 h-6" />
                  {formatNumber(analytics.mostViewedPost.views)}
                  <span className="text-sm text-muted-foreground font-normal">views</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Link
                    href={`/admin/edit/${analytics.mostViewedPost.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <a
                    href={`/blog/${analytics.mostViewedPost.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">No published posts yet</div>
            )}
          </div>
        </AnimatedSection>
      </div>

      {/* Posts Table */}
      <AnimatedSection className="mt-12">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl mb-1">All Posts</h2>
              <p className="text-sm text-muted-foreground">Manage your content</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-border">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium hidden sm:table-cell">Date</th>
                  <th className="pb-3 font-medium">Views</th>
                  <th className="pb-3 font-medium hidden md:table-cell">Read Time</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {serializedPosts.map((post, index) => (
                  <PostTableRow key={post.id} post={post} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>
    </DashboardLayoutClient>
  );
}
