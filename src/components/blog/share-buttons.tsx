'use client';

import { Share2, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-400 font-sans flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      <div className="flex gap-1">
        <button
          onClick={handleTwitterShare}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5 text-gray-500 hover:text-black" />
        </button>
        <button
          onClick={handleLinkedInShare}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5 text-gray-500 hover:text-black" />
        </button>
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative"
          aria-label="Copy link"
        >
          <LinkIcon className="w-5 h-5 text-gray-500 hover:text-black" />
          {copied && (
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-black text-white text-xs font-sans rounded-md whitespace-nowrap shadow-sm">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}