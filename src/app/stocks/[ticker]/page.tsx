import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
} from 'lucide-react';
import { getTicker } from '@/services/TicketApi';

const VALID_TICKERS = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'NVDA'];

export default async function TickerPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const symbol = ticker.toUpperCase();

  if (!VALID_TICKERS.includes(symbol)) {
    notFound();
  }

  const data = await getTicker(symbol);
  const result = data?.results?.[0];

  if (!result) {
    return (
      <div className="p-6 pt-20 lg:pt-6">
        <p className="text-red-500">Failed to fetch data for {symbol}.</p>
      </div>
    );
  }

  const change = result.c - result.o;
  const changePct = (change / result.o) * 100;
  const isUp = change >= 0;

  return (
    <div className="p-6 pt-20 lg:pt-6 space-y-6">
      {/* Breadcrumb */}
      <Link
        href="/stocks"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition"
      >
        <ArrowLeft size={16} />
        Back to Stocks
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">{symbol}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Previous Close
          </p>
        </div>

        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
            isUp
              ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
              : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'
          }`}
        >
          {isUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
          {isUp ? '+' : ''}
          {change.toFixed(2)} ({changePct.toFixed(2)}%)
        </div>
      </div>

      {/* Current Price */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Price
            </p>
            <p className="text-4xl font-bold dark:text-white">
              ${result.c.toFixed(2)}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
            <DollarSign size={28} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Close" value={result.c} color="red" />
        <StatCard label="Open"  value={result.o} color="blue" />
        <StatCard label="High"  value={result.h} color="green" />
        <StatCard label="Low"   value={result.l} color="yellow" />
      </div>

      {/* Volume + Extra */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={18} className="text-blue-600" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Volume
            </p>
          </div>
          <p className="text-2xl font-bold dark:text-white">
            {result.v.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Day Range
          </p>
          <p className="text-2xl font-bold dark:text-white">
            ${result.l.toFixed(2)} — ${result.h.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

const colorMap = {
  red:    'bg-red-50 dark:bg-red-950/40 border-red-100 dark:border-red-900/50 text-red-700 dark:text-red-300',
  blue:   'bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-300',
  green:  'bg-green-50 dark:bg-green-950/40 border-green-100 dark:border-green-900/50 text-green-700 dark:text-green-300',
  yellow: 'bg-yellow-50 dark:bg-yellow-950/40 border-yellow-100 dark:border-yellow-900/50 text-yellow-700 dark:text-yellow-300',
} as const;

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: keyof typeof colorMap;
}) {
  return (
    <div className={`rounded-2xl p-5 border shadow-sm ${colorMap[color]}`}>
      <p className="text-sm font-medium mb-2">{label}</p>
      <p className="text-2xl font-bold">${value.toFixed(2)}</p>
    </div>
  );
}