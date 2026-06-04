import { BlogPost, Author, DashboardStats } from '@/types';

export const author: Author = {
  name: 'Joshi',
  avatar: '/avatar.jpg',
  bio: 'Full Stack Developer. Building products, writing about code, systems, and the journey of creation.',
  social: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
};

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Systems: Lessons from the Trenches',
    slug: 'building-scalable-systems',
    excerpt:
      'After years of building systems that serve millions of users, here are the principles that actually matter when it comes to scalability.',
    content: `<p class="drop-cap">The journey to building truly scalable systems is filled with unexpected challenges and hard-won lessons. In my years of experience architecting systems that serve millions of users, I've discovered that scalability isn't just about adding more servers—it's about thoughtful design from the ground up.</p>

<h2>The Foundation: Understanding Your Constraints</h2>

<p>Before diving into architecture decisions, you need to understand your constraints. What are your read/write ratios? What's your acceptable latency? How does your data grow over time? These questions form the foundation of every scalability decision you'll make.</p>

<blockquote>
"Premature optimization is the root of all evil, but premature pessimization is the root of all mediocrity."
</blockquote>

<p>I've seen teams over-engineer solutions for problems they don't have, and I've seen teams under-engineer solutions that collapse under real-world load. The key is understanding where you are on this spectrum.</p>

<h2>Horizontal vs Vertical Scaling</h2>

<p>The age-old debate continues, but the answer is almost always "both, strategically applied." Here's what I've learned:</p>

<ul>
<li>Start with vertical scaling—it's simpler and often cheaper</li>
<li>Design for horizontal scaling from day one</li>
<li>Identify your bottlenecks before throwing resources at them</li>
<li>Remember that some problems can't be solved by adding more machines</li>
</ul>

<h3>A Practical Example</h3>

<pre><code>// Simple connection pooling pattern
const pool = new ConnectionPool({
  maxConnections: 100,
  minConnections: 10,
  acquireTimeout: 5000,
  idleTimeout: 30000,
});

async function executeQuery(query) {
  const connection = await pool.acquire();
  try {
    return await connection.execute(query);
  } finally {
    pool.release(connection);
  }
}</code></pre>

<p>This pattern alone has saved countless systems from connection exhaustion under load.</p>

<h2>The Human Element</h2>

<p>Perhaps the most overlooked aspect of scalability is the human element. Your system's ability to scale is directly proportional to your team's ability to understand and modify it. Clean architecture, good documentation, and clear ownership boundaries are just as important as your technical choices.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
    author,
    publishedAt: '2024-01-15T10:00:00Z',
    readingTime: 8,
    tags: ['Architecture', 'Scalability', 'Engineering'],
    featured: true,
    views: 12453,
  },
  {
    id: '2',
    title: 'The Art of Writing Clean Code',
    slug: 'art-of-clean-code',
    excerpt:
      "Clean code isn't about following rules—it's about communication. Here's how to write code that speaks.",
    content: `<p class="drop-cap">Writing clean code is an art form that separates good developers from great ones. It's not about following arbitrary rules or adhering to style guides—it's about communication. Your code tells a story, and that story should be easy to read.</p>

<h2>The Purpose of Clean Code</h2>

<p>Code is read far more often than it is written. Every time you write a function, you're creating a contract with future developers (including yourself). That contract should be crystal clear.</p>

<blockquote>
"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler
</blockquote>

<h2>Naming Things</h2>

<p>The hardest problem in computer science isn't cache invalidation or off-by-one errors—it's naming things. Good names are:</p>

<ul>
<li>Intention-revealing</li>
<li>Pronounceable</li>
<li>Searchable</li>
<li>Without encodings</li>
</ul>

<pre><code>// Bad
const d = new Date();
const fn = (a, b) => a + b;

// Good
const currentTimestamp = new Date();
const calculateTotal = (price, tax) => price + tax;</code></pre>

<h2>Functions Should Do One Thing</h2>

<p>A function should do one thing, do it well, and do it only. If you find yourself using the word "and" to describe what a function does, it's time to split it.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    author,
    publishedAt: '2024-01-10T10:00:00Z',
    readingTime: 6,
    tags: ['Clean Code', 'Best Practices', 'Programming'],
    featured: false,
    views: 8234,
  },
  {
    id: '3',
    title: 'Why I Switched to TypeScript (And Never Looked Back)',
    slug: 'why-typescript',
    excerpt:
      "TypeScript transformed how I think about JavaScript. Here's the journey from skeptic to advocate.",
    content: `<p class="drop-cap">I was a TypeScript skeptic. "It's just JavaScript with extra steps," I'd say. "The type system is too rigid." Three years later, I can't imagine building anything serious without it.</p>

<h2>The Turning Point</h2>

<p>The moment that changed everything was a production bug that TypeScript would have caught at compile time. A simple typo in a property name caused hours of debugging in production.</p>

<pre><code>// The bug that converted me
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// In JavaScript, this silently fails
const greeting = \`Hello, \${user.fristName}\`; // typo!

// TypeScript catches this immediately
// Property 'fristName' does not exist on type 'User'</code></pre>

<h2>Beyond Type Safety</h2>

<p>But TypeScript is more than just catching typos. It's a thinking tool that forces you to consider your data structures upfront. The type system becomes documentation that can't go stale.</p>`,
    coverImage:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
    author,
    publishedAt: '2024-01-05T10:00:00Z',
    readingTime: 5,
    tags: ['TypeScript', 'JavaScript', 'Development'],
    featured: true,
    views: 15678,
  },
  {
    id: '4',
    title: 'Designing for Developer Experience',
    slug: 'designing-for-dx',
    excerpt:
      "Great developer tools aren't just functional—they're delightful. Here's how to build tools that developers love.",
    content: `<p class="drop-cap">Developer Experience (DX) is the new frontier of product design. As developers, we spend our days with tools—editors, CLIs, APIs, documentation. The best tools don't just work; they anticipate our needs and get out of our way.</p>

<h2>The Principles of Great DX</h2>

<p>After building developer tools for years, I've distilled the principles that make tools truly exceptional:</p>

<ol>
<li><strong>Zero to Hello World in 5 minutes</strong> - The faster a developer can see value, the more likely they are to stick around.</li>
<li><strong>Sensible Defaults</strong> - Don't make developers configure things they don't care about.</li>
<li><strong>Progressive Disclosure</strong> - Simple things should be simple; complex things should be possible.</li>
<li><strong>Excellent Error Messages</strong> - Every error is an opportunity to help.</li>
</ol>

<blockquote>
"The best interface is no interface." — Golden Krishna
</blockquote>`,
    coverImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop',
    author,
    publishedAt: '2024-01-01T10:00:00Z',
    readingTime: 7,
    tags: ['DX', 'Design', 'Developer Tools'],
    featured: false,
    views: 6789,
  },
];

export const dashboardStats: DashboardStats = {
  totalPosts: mockPosts.length,
  totalViews: mockPosts.reduce((acc, post) => acc + post.views, 0),
  engagementRate: 4.2,
  averageReadTime: 6.5,
  topPost: mockPosts.find((p) => p.id === '3') || null,
  recentViews: [
    { date: '2024-01-09', views: 1234 },
    { date: '2024-01-10', views: 1456 },
    { date: '2024-01-11', views: 1678 },
    { date: '2024-01-12', views: 1234 },
    { date: '2024-01-13', views: 2345 },
    { date: '2024-01-14', views: 1890 },
    { date: '2024-01-15', views: 2456 },
  ],
};
