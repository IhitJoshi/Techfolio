import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@techfolio.dev';
        // Temporary hardcoded hash for admin123
        const adminPasswordHash = '$2b$10$9C5sx3u9U8khx7PkBrqgP.l9QWfLA1uYfA.0O8y2Uk.abRABuHvGq';

        console.log('Admin email from env:', adminEmail);
        console.log('Password hash exists:', !!adminPasswordHash);
        console.log('Password hash length:', adminPasswordHash?.length);

        if (!adminEmail || !adminPasswordHash) {
          console.error('Admin credentials not configured in environment');
          return null;
        }

        if (credentials.email !== adminEmail) {
          console.log('Email mismatch:', credentials.email, 'vs', adminEmail);
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          adminPasswordHash,
        );

        console.log('Password valid:', isValidPassword);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: '1',
          email: adminEmail,
          name: 'Admin',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
