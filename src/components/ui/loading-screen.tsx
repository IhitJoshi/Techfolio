'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Feather } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Feather className="w-12 h-12 text-black" />
            </motion.div>
            <div className="flex gap-1.5 mt-6">
              <motion.div
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0,
                }}
                className="w-2 h-2 rounded-full bg-black"
              />
              <motion.div
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.2,
                }}
                className="w-2 h-2 rounded-full bg-gray-600"
              />
              <motion.div
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.4,
                }}
                className="w-2 h-2 rounded-full bg-gray-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}