import { createClient } from 'redis';

export type CounterEntry = {
  id: string;
  timestamp: string;
  reason: string;
};

export type User = {
  id: string;
  name: string;
  counters: CounterEntry[];
};

export type CounterData = {
  users: User[];
};

const COUNTER_KEY = 'counter-tool-data';

let redisClient: ReturnType<typeof createClient> | null = null;
let connectionPromise: Promise<ReturnType<typeof createClient>> | null = null;

async function getRedisClient() {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });
    await redisClient.connect();
    connectionPromise = null;
    return redisClient;
  })();

  return connectionPromise;
}

export async function getCounterData(): Promise<CounterData> {
  try {
    const client = await getRedisClient();
    const data = await client.get(COUNTER_KEY);
    return data ? JSON.parse(data) : { users: [] };
  } catch (error) {
    console.error('Error reading counter data:', error);
    return { users: [] };
  }
}

export async function saveCounterData(data: CounterData): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.set(COUNTER_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving counter data:', error);
    throw new Error('Failed to save counter data');
  }
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function getTotalCount(user: User): number {
  return user.counters.length;
}
