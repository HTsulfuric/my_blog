"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DailyUsage = {
  date: string;
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
  totalTokens: number;
  totalCost: number;
  modelsUsed: string[];
  modelBreakdowns: {
    modelName: string;
    inputTokens: number;
    outputTokens: number;
    cacheCreationTokens: number;
    cacheReadTokens: number;
    cost: number;
  }[];
};

export default function UsageChart({ data }: { data: DailyUsage[] }) {
  // Format date to be shorter if needed
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="w-full h-[400px] bg-gray-50 p-4 rounded-lg shadow-sm dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 text-center dark:text-white">
        Daily Claude Usage Cost
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="$" />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(4)}`, "Cost"]}
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
            }}
          />
          <Line
            type="monotone"
            dataKey="totalCost"
            stroke="#8884d8"
            name="Cost"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
