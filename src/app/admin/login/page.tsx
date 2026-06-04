'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = (await signIn('credentials', {
      redirect: false,
      email,
      password,
    })) as any;

    setLoading(false);

    if (res?.error) {
      setError('Invalid credentials');
      return;
    }

    // Redirect to dashboard on success
    router.push(
      new URLSearchParams(window.location.search).get('callbackUrl') || '/admin/dashboard',
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 glass-card rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Admin Sign In</h1>

        {error && <div className="text-sm text-destructive mb-4">{error}</div>}

        <label className="block mb-3">
          <span className="text-sm text-muted-foreground">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full input"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-muted-foreground">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full input"
          />
        </label>

        <button type="submit" className="w-full btn btn-primary" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
