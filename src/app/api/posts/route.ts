import { NextRequest, NextResponse } from 'next/server';
import { createPost, getPosts } from '@/lib/posts';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');

    // Fetch posts with optional published filter
    const posts = await getPosts({
      published: published === 'true' ? true : undefined,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const { title, content, excerpt, slug, coverImage, tags, featured, published } = body;

    // Validate required fields
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, slug' },
        { status: 400 },
      );
    }

    // Create the post
    const post = await createPost({
      title,
      content,
      excerpt: excerpt || undefined,
      slug,
      coverImage: coverImage || undefined,
      tags: tags ? tags.join(',') : undefined,
      featured: featured || false,
      published: published || false,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);

    // Handle unique constraint error
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
