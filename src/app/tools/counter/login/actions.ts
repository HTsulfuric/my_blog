'use server';

import { cookies, headers } from 'next/headers';
import { createClient } from 'redis';
import crypto from 'crypto';

const COOKIE_NAME = 'counter_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 60; // 1 minute

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  if (!process.env.REDIS_URL) {
    return null;
  }

  redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  await redisClient.connect();
  return redisClient;
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const client = await getRedisClient();
  if (!client) {
    return true;
  }

  const key = `login_attempts:${ip}`;
  const attempts = await client.get(key);
  const count = attempts ? parseInt(attempts) : 0;

  if (count >= MAX_ATTEMPTS) {
    return false;
  }

  return true;
}

async function recordAttempt(ip: string): Promise<void> {
  const client = await getRedisClient();
  if (!client) return;

  const key = `login_attempts:${ip}`;
  await client.incr(key);
  await client.expire(key, RATE_LIMIT_WINDOW);
}

function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf-8');
  const bufB = Buffer.from(b, 'utf-8');

  if (bufA.length !== bufB.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function verifyPassword(password: string) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

  const canAttempt = await checkRateLimit(ip);
  if (!canAttempt) {
    return { success: false, error: 'Too many attempts. Please try again later.' };
  }

  const correctPassword = process.env.COUNTER_PASSWORD;

  if (!correctPassword) {
    console.error('COUNTER_PASSWORD environment variable not set');
    return { success: false, error: 'Configuration error' };
  }

  const isValid = timingSafeCompare(password, correctPassword);

  if (!isValid) {
    await recordAttempt(ip);
    return { success: false, error: 'Invalid password' };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/tools/counter',
  });

  return { success: true };
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(COOKIE_NAME);
  return authCookie?.value === 'authenticated';
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return { success: true };
}
