import { getCounterData, getTotalCount } from '@/lib/counter-utils';
import { CounterClient } from '@/components/CounterClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'カウンター',
  description: 'プライベートカウンターツール',
};

export const dynamic = 'force-dynamic';

export default async function CounterPage() {
  const data = await getCounterData();

  const sortedUsers = [...data.users].sort((a, b) => {
    const countDiff = getTotalCount(b) - getTotalCount(a);
    if (countDiff !== 0) return countDiff;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-nord-snow-storm dark:bg-nord-polar-night py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">カウンター</h1>
          <p className="text-gray-600 dark:text-gray-400">
            ユーザーごとのカウントを記録できます
          </p>
        </div>

        <CounterClient users={sortedUsers} />
      </div>
    </div>
  );
}
