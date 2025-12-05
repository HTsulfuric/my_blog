import UsageChart from "./UsageChart";
import usageData from "@/data/usage.json";

export const metadata = {
  title: "Claude Usage Stats",
  description: "Daily usage statistics for Claude API",
};

export default function UsagePage() {
  const lastUpdated = usageData.daily.length > 0 
    ? usageData.daily[usageData.daily.length - 1].date 
    : new Date().toLocaleDateString();

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Claude API Usage</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visualization of daily costs and token consumption.
        </p>
      </div>
      
      <UsageChart data={usageData.daily} />

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-500 text-center">
        Last updated: {lastUpdated}
      </div>
    </main>
  );
}
