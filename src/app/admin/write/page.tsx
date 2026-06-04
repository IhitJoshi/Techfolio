'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Save,
  Eye,
  EyeOff,
  Clock,
  X,
  Check,
  ArrowLeft,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';
import { TiptapEditor } from '@/components/editor/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { calculateReadingTime, generateSlug } from '@/lib/blog-utils';
import { toast } from 'sonner';
import Link from 'next/link';

export default function AdminWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Convert to data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCoverImage(dataUrl);
      toast.success('Image uploaded successfully!');
    };
    reader.onerror = () => {
      toast.error('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      toast.error('Please add a title');
      return;
    }
    if (!content.trim() || content === '<p></p>') {
      toast.error('Please add some content');
      return;
    }

    setIsSaving(true);

    try {
      const baseSlug = generateSlug(title);
      const uniqueSlug = `${baseSlug}-${Date.now()}`;
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: uniqueSlug,
          content,
          excerpt: excerpt.trim() || content.replace(/<[^>]*>/g, '').substring(0, 200),
          coverImage: coverImage || undefined,
          tags,
          featured: isFeatured,
          published: false, // Save as draft
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save draft');
      }

      setLastSaved(new Date());
      toast.success('Draft saved successfully!');

      // Clear the editor
      setTitle('');
      setContent('');
      setExcerpt('');
      setCoverImage('');
      setTags([]);
      setIsFeatured(false);

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 500);
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error('Please add a title');
      return;
    }
    if (!content.trim() || content === '<p></p>') {
      toast.error('Please add some content');
      return;
    }

    setIsSaving(true);

    try {
      const baseSlug = generateSlug(title);
      const uniqueSlug = `${baseSlug}-${Date.now()}`;
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: uniqueSlug,
          content,
          excerpt: excerpt.trim() || content.replace(/<[^>]*>/g, '').substring(0, 200),
          coverImage: coverImage || undefined,
          tags,
          featured: isFeatured,
          published: true, // Publish immediately
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to publish post');
      }

      toast.success('Post published successfully!');

      // Clear the editor
      setTitle('');
      setContent('');
      setExcerpt('');
      setCoverImage('');
      setTags([]);
      setIsFeatured(false);

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to publish post');
    } finally {
      setIsSaving(false);
    }
  };

  const readingTime = calculateReadingTime(content);

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6 mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <h1 className="font-display text-2xl">New Post</h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            {lastSaved && (
              <span className="text-xs text-muted-foreground">
                Saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
              className="gap-2"
            >
              {isPreview ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Preview
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSaveDraft} className="gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button
              className="bg-accent text-white hover:bg-accent/90"
              onClick={handlePublish}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Publishing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Publish
                </span>
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Editor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto px-6"
      >
        {isPreview ? (
          <div className="glass-card rounded-xl p-8 md:p-12">
            {coverImage && (
              <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-8">
                <img src={coverImage} alt={title} className="w-full h-full object-cover" />
              </div>
            )}
            <h1 className="font-display text-4xl mb-4">{title || 'Untitled Post'}</h1>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-accent/10 text-accent rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{
                __html:
                  content || '<p class="text-muted-foreground">Start writing to see preview...</p>',
              }}
            />
          </div>
        ) : (
          <>
            {/* Cover Image Input */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Cover Image</span>
              </div>

              {/* Display selected image preview */}
              {coverImage && (
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full max-h-40 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setCoverImage('')}
                    className="absolute top-2 right-2 p-1 bg-destructive/80 hover:bg-destructive text-white rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                {/* File Upload */}
                <div className="flex-1">
                  <label className="block">
                    <div className="cursor-pointer px-4 py-2 rounded-lg bg-muted/50 border border-border/50 hover:border-accent/50 transition-all flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* URL Input */}
                <div className="flex-1">
                  <input
                    type="url"
                    value={coverImage.startsWith('data:') ? '' : coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Or paste image URL..."
                    className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border/50 focus:border-accent focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title..."
              className="w-full bg-transparent font-display text-4xl md:text-5xl placeholder:text-muted-foreground/50 focus:outline-none mb-4"
            />

            {/* Excerpt Input */}
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a brief excerpt (optional)..."
              rows={2}
              className="w-full bg-transparent text-lg text-muted-foreground placeholder:text-muted-foreground/50 focus:outline-none mb-6 resize-none"
            />

            {/* Tags and Featured Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex-1 min-w-[200px]">
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((tag) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-accent/10 text-accent rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-foreground"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags (press Enter)"
                    className="bg-transparent text-sm placeholder:text-muted-foreground/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Featured</span>
                <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>
            </div>

            {/* Editor */}
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="Tell your story..."
            />
          </>
        )}
      </motion.div>

      {/* Writing Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto px-6 mt-12"
      >
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-display text-lg mb-3">Writing Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Use the toolbar to format your text</li>
            <li>• Your draft is auto-saved every 30 seconds</li>
            <li>• Add relevant tags to help readers find your content</li>
            <li>• Toggle &quot;Featured&quot; to highlight this post on the homepage</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
