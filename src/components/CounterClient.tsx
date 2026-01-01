'use client';

import { useState, useTransition } from 'react';
import { addUser, deleteUser, addCounter, deleteCounter } from '@/app/tools/counter/actions';
import { formatRelativeDate } from '@/lib/utils';
import type { User } from '@/lib/counter-utils';

export function CounterClient({ users }: { users: User[] }) {
  const [newUserName, setNewUserName] = useState('');
  const [isPending, startTransition] = useTransition();
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());
  const [showReasonDialog, setShowReasonDialog] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    startTransition(async () => {
      try {
        await addUser(newUserName);
        setNewUserName('');
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to add user');
      }
    });
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (!confirm(`${userName}を削除しますか？`)) return;

    startTransition(async () => {
      try {
        await deleteUser(userId);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to delete user');
      }
    });
  };

  const handleAddCounter = (userId: string) => {
    if (!reason.trim()) return;

    startTransition(async () => {
      try {
        await addCounter(userId, reason);
        setReason('');
        setShowReasonDialog(null);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to add counter');
      }
    });
  };

  const handleDeleteCounter = (userId: string, counterId: string) => {
    if (!confirm('このエントリーを削除しますか？')) return;

    startTransition(async () => {
      try {
        await deleteCounter(userId, counterId);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to delete counter');
      }
    });
  };

  const toggleExpanded = (userId: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  return (
    <div className="space-y-8">
      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="flex gap-2">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="ユーザー名を入力"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-nord-frost-blue"
          disabled={isPending}
          maxLength={100}
        />
        <button
          type="submit"
          disabled={isPending || !newUserName.trim()}
          className="px-6 py-2 bg-nord-frost-blue hover:bg-nord-frost-blue-dark text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          追加
        </button>
      </form>

      {/* User List */}
      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            まだユーザーがいません
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3"
            >
              {/* User Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    合計: {user.counters.length}回
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowReasonDialog(user.id)}
                    disabled={isPending}
                    className="px-4 py-2 bg-nord-frost-cyan hover:bg-opacity-80 text-white rounded-lg disabled:opacity-50 transition-colors"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id, user.name)}
                    disabled={isPending}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>

              {/* History Toggle */}
              {user.counters.length > 0 && (
                <>
                  <button
                    onClick={() => toggleExpanded(user.id)}
                    className="text-sm text-nord-frost-blue hover:underline"
                  >
                    {expandedUsers.has(user.id) ? '履歴を隠す' : '履歴を表示'}
                  </button>

                  {/* History List */}
                  {expandedUsers.has(user.id) && (
                    <div className="space-y-2 mt-2 border-t border-gray-200 dark:border-gray-700 pt-3">
                      {user.counters.map((counter) => (
                        <div
                          key={counter.id}
                          className="flex items-start justify-between gap-4 p-2 rounded bg-gray-50 dark:bg-gray-900"
                        >
                          <div className="flex-1">
                            <p className="text-sm">{counter.reason}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {formatRelativeDate(counter.timestamp)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteCounter(user.id, counter.id)}
                            disabled={isPending}
                            className="text-xs text-red-500 hover:text-red-600 disabled:opacity-50"
                          >
                            削除
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reason Dialog */}
      {showReasonDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full space-y-4">
            <h3 className="text-xl font-semibold">理由を入力</h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="理由を入力してください"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-nord-frost-blue resize-none"
              rows={4}
              maxLength={500}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowReasonDialog(null);
                  setReason('');
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                disabled={isPending}
              >
                キャンセル
              </button>
              <button
                onClick={() => handleAddCounter(showReasonDialog)}
                disabled={isPending || !reason.trim()}
                className="px-4 py-2 bg-nord-frost-blue hover:bg-nord-frost-blue-dark text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                追加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
