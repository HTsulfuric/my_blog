'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { verifyPassword } from './actions';

export function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      try {
        const result = await verifyPassword(password);
        if (result.success) {
          router.push('/tools/counter');
          router.refresh();
        } else {
          if (result.error?.includes('Too many attempts')) {
            setError('試行回数が多すぎます。1分後に再試行してください。');
          } else {
            setError('パスワードが正しくありません');
          }
          setPassword('');
        }
      } catch {
        setError('エラーが発生しました');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-nord-frost-blue"
          disabled={isPending}
          autoFocus
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending || !password}
        className="w-full px-4 py-2 bg-nord-frost-blue hover:bg-nord-frost-blue-dark text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  );
}
