import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const samplePosts = [
  {
    title: 'Getting Started with Next.js 15 and TypeScript',
    slug: 'getting-started-nextjs-15-typescript',
    excerpt:
      'Learn how to build modern web applications with Next.js 15, TypeScript, and the App Router. This comprehensive guide covers everything from setup to deployment.',
    content: `
# Getting Started with Next.js 15 and TypeScript

Next.js 15 brings exciting new features and improvements to the React framework. In this guide, we'll explore how to build modern web applications using Next.js 15 with TypeScript.

## Why Next.js 15?

Next.js 15 introduces several groundbreaking features:

- **React Server Components**: Better performance and SEO
- **App Router**: Enhanced routing with layouts and loading states
- **Turbopack**: Faster development builds
- **Server Actions**: Simplified data mutations

## Setting Up Your Project

Start by creating a new Next.js project with TypeScript:

\`\`\`bash
npx create-next-app@latest my-app --typescript
\`\`\`

This will set up a new project with all the necessary dependencies and configurations.

## Project Structure

The new App Router introduces a more intuitive file structure:

\`\`\`
app/
  layout.tsx
  page.tsx
  about/
    page.tsx
\`\`\`

## Server Components by Default

All components in the app directory are Server Components by default. This means they:

- Run on the server
- Can directly access databases
- Reduce client-side JavaScript
- Improve initial page load

## Client Components

When you need interactivity, use the 'use client' directive:

\`\`\`tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Conclusion

Next.js 15 with TypeScript provides a powerful foundation for building modern web applications. Start building today!
    `,
    coverImage: '/images/nextjs-cover.jpg',
    tags: ['Next.js', 'TypeScript', 'React', 'Web Development'].join(','),
    featured: true,
    published: true,
    views: 1247,
  },
  {
    title: 'Mastering Tailwind CSS: A Complete Guide',
    slug: 'mastering-tailwind-css-complete-guide',
    excerpt:
      'Discover the power of utility-first CSS with Tailwind. Learn best practices, responsive design, and advanced techniques for building beautiful interfaces.',
    content: `
# Mastering Tailwind CSS: A Complete Guide

Tailwind CSS has revolutionized the way we write CSS. This utility-first framework allows you to build custom designs without leaving your HTML.

## Why Tailwind CSS?

Tailwind offers several advantages:

- **Utility-First**: Compose designs using utility classes
- **Responsive**: Mobile-first responsive design
- **Customizable**: Fully configurable design system
- **Performance**: Automatic purging of unused CSS

## Getting Started

Install Tailwind in your project:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Core Concepts

### Utility Classes

Instead of writing custom CSS, you compose utilities:

\`\`\`html
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Hello Tailwind!
</div>
\`\`\`

### Responsive Design

Tailwind makes responsive design simple:

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
\`\`\`

### Dark Mode

Built-in dark mode support:

\`\`\`html
<div class="bg-white dark:bg-gray-800">
  Dark mode ready!
</div>
\`\`\`

## Best Practices

1. **Use @apply sparingly**: Prefer utility classes in HTML
2. **Customize your config**: Extend the default theme
3. **Use components**: Extract repeated patterns
4. **Enable JIT mode**: Faster builds and smaller files

## Advanced Techniques

### Custom Utilities

Extend Tailwind with custom utilities in your config:

\`\`\`js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand': '#3B82F6',
      },
    },
  },
};
\`\`\`

## Conclusion

Tailwind CSS empowers you to build beautiful, responsive interfaces quickly and efficiently. Happy styling!
    `,
    coverImage: '/images/tailwind-cover.jpg',
    tags: ['CSS', 'Tailwind', 'Web Design', 'Frontend'].join(','),
    featured: true,
    published: true,
    views: 982,
  },
  {
    title: 'Building RESTful APIs with Node.js and Express',
    slug: 'building-restful-apis-nodejs-express',
    excerpt:
      'A practical guide to creating scalable and maintainable REST APIs using Node.js, Express, and modern JavaScript features.',
    content: `
# Building RESTful APIs with Node.js and Express

Learn how to build robust REST APIs using Node.js and Express. This guide covers everything from setup to deployment.

## What is REST?

REST (Representational State Transfer) is an architectural style for building web services:

- **Stateless**: Each request contains all necessary information
- **Resource-Based**: URLs represent resources
- **HTTP Methods**: GET, POST, PUT, DELETE
- **JSON**: Standard data format

## Setting Up Express

Create a new project and install Express:

\`\`\`bash
npm init -y
npm install express
\`\`\`

## Basic Server

Create a simple Express server:

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## CRUD Operations

Implement Create, Read, Update, Delete operations:

\`\`\`javascript
// Create
app.post('/api/users', (req, res) => {
  const user = req.body;
  // Save to database
  res.status(201).json(user);
});

// Read
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  // Fetch from database
  res.json({ id, name: 'John' });
});

// Update
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  // Update in database
  res.json({ id, ...updates });
});

// Delete
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  // Delete from database
  res.status(204).send();
});
\`\`\`

## Error Handling

Implement proper error handling:

\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
\`\`\`

## Best Practices

1. **Use middleware**: For authentication, logging, etc.
2. **Validate input**: Sanitize and validate all user input
3. **Handle errors**: Centralized error handling
4. **Version your API**: Use /api/v1/ prefix
5. **Document**: Use tools like Swagger

## Conclusion

Building REST APIs with Node.js and Express is straightforward and powerful. Start building your own APIs today!
    `,
    coverImage: '/images/nodejs-cover.jpg',
    tags: ['Node.js', 'Express', 'API', 'Backend'].join(','),
    featured: false,
    published: true,
    views: 756,
  },
  {
    title: 'Introduction to React Hooks: useState and useEffect',
    slug: 'introduction-react-hooks-usestate-useeffect',
    excerpt:
      'Master React Hooks with this beginner-friendly guide. Learn how to manage state and side effects using useState and useEffect hooks.',
    content: `
# Introduction to React Hooks: useState and useEffect

React Hooks revolutionized how we write React components. Let's explore the two most important hooks: useState and useEffect.

## What are Hooks?

Hooks are functions that let you "hook into" React features from function components:

- **State Management**: useState
- **Side Effects**: useEffect
- **Context**: useContext
- **And more**: useReducer, useMemo, useCallback

## useState Hook

The useState hook allows you to add state to function components:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### Multiple State Variables

You can use useState multiple times:

\`\`\`jsx
const [name, setName] = useState('');
const [age, setAge] = useState(0);
const [email, setEmail] = useState('');
\`\`\`

## useEffect Hook

useEffect lets you perform side effects in function components:

\`\`\`jsx
import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []); // Empty array means run once
  
  return <div>{data && JSON.stringify(data)}</div>;
}
\`\`\`

### Dependency Array

The dependency array controls when the effect runs:

\`\`\`jsx
// Run on every render
useEffect(() => {
  console.log('Rendered');
});

// Run once on mount
useEffect(() => {
  console.log('Mounted');
}, []);

// Run when count changes
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);
\`\`\`

### Cleanup

Effects can return a cleanup function:

\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  // Cleanup
  return () => clearInterval(timer);
}, []);
\`\`\`

## Best Practices

1. **One concern per effect**: Split complex logic into multiple effects
2. **Always specify dependencies**: Avoid bugs from stale closures
3. **Clean up subscriptions**: Prevent memory leaks
4. **Extract custom hooks**: Reuse stateful logic

## Conclusion

React Hooks make function components as powerful as class components, with cleaner and more readable code. Start using them today!
    `,
    coverImage: '/images/react-hooks-cover.jpg',
    tags: ['React', 'Hooks', 'JavaScript', 'Frontend'].join(','),
    featured: false,
    published: true,
    views: 623,
  },
  {
    title: 'Database Design Best Practices with PostgreSQL',
    slug: 'database-design-best-practices-postgresql',
    excerpt:
      'Learn how to design efficient and scalable database schemas using PostgreSQL. Covers normalization, indexing, and performance optimization.',
    content: `
# Database Design Best Practices with PostgreSQL

Good database design is crucial for application performance and maintainability. Let's explore best practices using PostgreSQL.

## Database Normalization

Normalization reduces data redundancy:

### First Normal Form (1NF)
- Eliminate repeating groups
- Each column contains atomic values

### Second Normal Form (2NF)
- Meet 1NF requirements
- Remove partial dependencies

### Third Normal Form (3NF)
- Meet 2NF requirements
- Remove transitive dependencies

## Example Schema

\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Indexing Strategies

Indexes improve query performance:

\`\`\`sql
-- Single column index
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Composite index
CREATE INDEX idx_posts_published_created 
ON posts(published, created_at DESC);

-- Unique index
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Partial index
CREATE INDEX idx_posts_published 
ON posts(published) WHERE published = true;
\`\`\`

## Query Optimization

### Use EXPLAIN ANALYZE

Understand query performance:

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM posts 
WHERE user_id = 1 
ORDER BY created_at DESC;
\`\`\`

### Avoid N+1 Queries

Use JOINs instead of multiple queries:

\`\`\`sql
-- Good: Single query with JOIN
SELECT posts.*, users.username
FROM posts
JOIN users ON posts.user_id = users.id;

-- Bad: Multiple queries
SELECT * FROM posts;
-- Then for each post:
SELECT username FROM users WHERE id = ?;
\`\`\`

## Data Types

Choose appropriate data types:

- **TEXT** vs **VARCHAR**: Use TEXT for unlimited length
- **INTEGER** vs **BIGINT**: Consider future growth
- **TIMESTAMP** vs **DATE**: Include time when needed
- **JSONB** vs **JSON**: JSONB for querying

## Constraints

Use constraints to maintain data integrity:

\`\`\`sql
-- Check constraint
ALTER TABLE users 
ADD CONSTRAINT check_email 
CHECK (email LIKE '%@%');

-- Foreign key with cascade
ALTER TABLE posts
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) 
REFERENCES users(id) 
ON DELETE CASCADE;
\`\`\`

## Best Practices

1. **Use primary keys**: Always have a primary key
2. **Index foreign keys**: Improve JOIN performance
3. **Avoid premature optimization**: Profile before optimizing
4. **Use transactions**: Ensure data consistency
5. **Regular backups**: Protect your data
6. **Monitor performance**: Use pg_stat_statements

## Conclusion

Good database design is an investment that pays dividends in performance, maintainability, and scalability. Plan carefully and iterate!
    `,
    coverImage: '/images/postgresql-cover.jpg',
    tags: ['PostgreSQL', 'Database', 'SQL', 'Backend'].join(','),
    featured: false,
    published: true,
    views: 445,
  },
  {
    title: 'Authentication and Security in Modern Web Apps',
    slug: 'authentication-security-modern-web-apps',
    excerpt:
      'A comprehensive guide to implementing secure authentication systems. Learn about JWT, OAuth, sessions, and security best practices.',
    content: `
# Authentication and Security in Modern Web Apps

Security is paramount in modern web applications. Let's explore authentication strategies and security best practices.

## Authentication Strategies

### Session-Based Authentication

Traditional approach using server-side sessions:

\`\`\`javascript
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Verify credentials
  const user = await authenticate(username, password);
  
  if (user) {
    req.session.userId = user.id;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
\`\`\`

### JWT (JSON Web Tokens)

Stateless authentication using tokens:

\`\`\`javascript
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await authenticate(username, password);
  
  if (user) {
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
\`\`\`

### OAuth 2.0

Third-party authentication:

\`\`\`javascript
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/dashboard');
  }
);
\`\`\`

## Password Security

### Hashing

Never store plain-text passwords:

\`\`\`javascript
const bcrypt = require('bcrypt');

// Hash password
const saltRounds = 10;
const hash = await bcrypt.hash(password, saltRounds);

// Verify password
const isValid = await bcrypt.compare(password, hash);
\`\`\`

### Password Requirements

Enforce strong passwords:

- Minimum 8 characters
- Mix of uppercase and lowercase
- Include numbers and symbols
- No common passwords

## Security Best Practices

### HTTPS Only

Always use HTTPS in production:

\`\`\`nginx
server {
  listen 443 ssl;
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;
}
\`\`\`

### CORS Configuration

Configure CORS properly:

\`\`\`javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
\`\`\`

### Rate Limiting

Prevent brute force attacks:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

### Input Validation

Validate and sanitize all input:

\`\`\`javascript
const { body, validationResult } = require('express-validator');

app.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Process registration
  }
);
\`\`\`

### SQL Injection Prevention

Use parameterized queries:

\`\`\`javascript
// Good: Parameterized query
db.query('SELECT * FROM users WHERE id = $1', [userId]);

// Bad: String concatenation
db.query(\`SELECT * FROM users WHERE id = \${userId}\`);
\`\`\`

### XSS Prevention

Escape user input:

\`\`\`javascript
// Use templating engines that auto-escape
// Or manually escape
const escapeHtml = (str) => {
  return str.replace(/[&<>"']/g, (char) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return map[char];
  });
};
\`\`\`

## Security Headers

Use security headers:

\`\`\`javascript
const helmet = require('helmet');

app.use(helmet());
\`\`\`

This adds headers like:
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Content-Security-Policy

## Conclusion

Security is not optional—it's essential. Implement these practices to protect your users and your application. Stay vigilant and keep learning!
    `,
    coverImage: '/images/security-cover.jpg',
    tags: ['Security', 'Authentication', 'Web Development', 'Backend'].join(','),
    featured: true,
    published: false, // Draft post
    views: 0,
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing posts
  await prisma.post.deleteMany();
  console.log('✅ Cleared existing posts');

  // Create posts
  for (const post of samplePosts) {
    await prisma.post.create({
      data: post,
    });
    console.log(`✅ Created post: ${post.title}`);
  }

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
