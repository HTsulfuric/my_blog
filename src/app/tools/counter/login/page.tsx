import { LoginForm } from './LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログイン - カウンター',
  description: 'カウンターツールへのアクセスにはパスワードが必要です',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-nord-snow-storm dark:bg-nord-polar-night flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">カウンターツール</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              このツールにアクセスするにはパスワードが必要です
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
