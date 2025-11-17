import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { isAdminAddress } from '@/config/admin';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
);

export interface SessionData {
  userId: string;
  walletAddress: string;
  isAdmin: boolean;
}

export async function createSession(data: SessionData): Promise<string> {
  const token = await new SignJWT({ ...data })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  return token;
}

export async function verifySession(token: string): Promise<SessionData | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as SessionData;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  return verifySession(token);
}

export function isAdmin(walletAddress: string): boolean {
  return isAdminAddress(walletAddress);
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await requireAuth();

  if (!session.isAdmin) {
    throw new Error('Forbidden: Admin access required');
  }

  return session;
}
