'use client';

import { motion } from 'framer-motion';

interface MonthlyChartBarProps {
  month: string;
  count: number;
  maxCount: number;
  index: number;
}

export function MonthlyChartBar({ month, count, maxCount, index }: MonthlyChartBarProps) {
  const height = maxCount > 0 ? (count / maxCount) * 100 : 0;

  return (
    <motion.div
      key={month}
      initial={{ height: 0 }}
      animate={{ height: `${height}%` }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex-1 bg-accent rounded-t-md relative group cursor-pointer min-h-[20px]"
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg border border-border z-10">
        {count} posts
      </div>
    </motion.div>
  );
}
