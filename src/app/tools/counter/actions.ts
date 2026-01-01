'use server';

import {
  getCounterData,
  saveCounterData,
  generateId,
  type CounterEntry,
} from '@/lib/counter-utils';
import { revalidatePath } from 'next/cache';

export async function addUser(name: string) {
  if (!name || name.trim().length === 0) {
    throw new Error('User name is required');
  }

  if (name.length > 100) {
    throw new Error('User name is too long (max 100 characters)');
  }

  const data = await getCounterData();

  const newUser = {
    id: generateId(),
    name: name.trim(),
    counters: [],
  };

  data.users.push(newUser);
  await saveCounterData(data);
  revalidatePath('/tools/counter');

  return { success: true };
}

export async function deleteUser(userId: string) {
  const data = await getCounterData();
  data.users = data.users.filter((user) => user.id !== userId);
  await saveCounterData(data);
  revalidatePath('/tools/counter');

  return { success: true };
}

export async function addCounter(userId: string, reason: string) {
  if (!reason || reason.trim().length === 0) {
    throw new Error('Reason is required');
  }

  if (reason.length > 500) {
    throw new Error('Reason is too long (max 500 characters)');
  }

  const data = await getCounterData();
  const user = data.users.find((u) => u.id === userId);

  if (!user) {
    throw new Error('User not found');
  }

  const newCounter: CounterEntry = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    reason: reason.trim(),
  };

  user.counters.unshift(newCounter);
  await saveCounterData(data);
  revalidatePath('/tools/counter');

  return { success: true };
}

export async function deleteCounter(userId: string, counterId: string) {
  const data = await getCounterData();
  const user = data.users.find((u) => u.id === userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.counters = user.counters.filter((c) => c.id !== counterId);
  await saveCounterData(data);
  revalidatePath('/tools/counter');

  return { success: true };
}
