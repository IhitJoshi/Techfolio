'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  index?: number;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  index = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-gray-100 rounded-xl p-6 hover:border-gray-200 transition-all duration-200 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 font-sans uppercase tracking-wider mb-1">{title}</p>
          <p className="text-3xl font-serif font-bold text-black tracking-tight">{value}</p>
          {change && (
            <p
              className={`text-xs mt-2 font-sans ${
                changeType === 'positive'
                  ? 'text-gray-600'
                  : changeType === 'negative'
                    ? 'text-gray-400'
                    : 'text-gray-400'
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div className="p-3 rounded-full bg-gray-100">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
      </div>
    </motion.div>
  );
}