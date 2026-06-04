'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  Trash2,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import { TiptapEditor } from '@/components/editor/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { calculateReadingTime, generateSlug } from '@/lib/blog-utils';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  coverImage?: string;
  tags?: string;
  featured: boolean;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminEditPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setTitle(data.title);
          setContent(data.content);
          setExcerpt(data.excerpt || '');
          setCoverImage(data.coverImage || '');
          setTags(data.tags ? data.tags.split(',').map((t: string) => t.trim()) : []);
          setIsFeatured(data.featured || false);
          setIsPublished(data.published || false);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Could not load post');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

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

  const handleUpdate = async () => {
    if (!title.trim()) {
      toast.error('Please add a title');
      return;
    }
    if (!content.trim() || content === '<p></p>') {
      toast.error('Please add some content');
      return;
    }
    if (!post) return;

    setIsSaving(true);

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: post.slug,
          content,
          excerpt: excerpt.trim() || content.replace(/<[^>]*>/g, '').substring(0, 200),
          coverImage: coverImage || undefined,
          tags,
          featured: isFeatured,
          published: isPublished,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update post');
      }

      toast.success('Post updated successfully!');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 500);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/posts/${post.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

        toast.success('Post deleted successfully');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 500);
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to delete post');
      }
    }
  };

  const readingTime = calculateReadingTime(content);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist.</p>
          <Link href="/admin/dashboard">
            <Button className="bg-accent text-white hover:bg-accent/90">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="font-display text-2xl">Edit Post</h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="gap-2 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <Button
              className="bg-accent text-white hover:bg-accent/90"
              onClick={handleUpdate}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Update
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

            {/* Tags and Featured/Published Toggles */}
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

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Featured</span>
                  <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Published</span>
                  <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                </div>
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
    </div>
  );
}
