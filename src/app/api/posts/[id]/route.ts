import { NextRequest, NextResponse } from 'next/server';
import { deletePost, updatePost, getPostBySlug } from '@/lib/posts';
import { auth } from '@/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Fetch the post
    const post = await getPostBySlug(id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const { title, content, excerpt, slug, coverImage, tags, featured, published } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content' },
        { status: 400 },
      );
    }

    // Update the post
    const updatedPost = await updatePost(id, {
      title,
      content,
      excerpt: excerpt || undefined,
      slug: slug || undefined,
      coverImage: coverImage || undefined,
      tags: tags ? tags.join(',') : undefined,
      featured: featured !== undefined ? featured : undefined,
      published: published !== undefined ? published : undefined,
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);

    // Handle unique constraint error
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Delete the post
    await deletePost(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
