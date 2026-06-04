import { BlogPost } from '@/types';

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getStoredPosts(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('techfolio-posts');
  return stored ? JSON.parse(stored) : [];
}

export function savePosts(posts: BlogPost[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('techfolio-posts', JSON.stringify(posts));
}

export function getStoredDraft(): { title: string; content: string } | null {
  if (typeof window === 'undefined') return null;
  const draft = localStorage.getItem('techfolio-draft');
  return draft ? JSON.parse(draft) : null;
}

export function saveDraft(title: string, content: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('techfolio-draft', JSON.stringify({ title, content }));
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('techfolio-draft');
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
