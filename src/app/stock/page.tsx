import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Award,
  Activity,
} from 'lucide-react';
import StockCard from '../components/stocks/StockCard';

const stocks = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 229.87,
    change: +2.34,
    pct: +1.03,
    open: 217.53,
    high: 231.42,
    low: 215.10,
    spark: [42, 45, 41, 48, 52, 49, 55, 58, 54, 60, 57, 62],
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: 421.15,
    change: -1.22,
    pct: -0.29,
    open: 422.37,
    high: 425.10,
    low: 418.20,
    spark: [60, 58, 62, 57, 55, 58, 54, 52, 55, 51, 53, 50],
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 178.42,
    change: +3.11,
    pct: +1.77,
    open: 175.31,
    high: 179.80,
    low: 173.50,
    spark: [30, 35, 32, 38, 42, 40, 45, 48, 52, 50, 55, 58],
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.90,
    change: -4.55,
    pct: -1.80,
    open: 253.45,
    high: 255.20,
    low: 246.10,
    spark: [65, 62, 60, 58, 61, 55, 52, 50, 48, 51, 47, 45],
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 195.30,
    change: +1.05,
    pct: +0.54,
    open: 194.25,
    high: 196.80,
    low: 193.10,
    spark: [40, 42, 38, 45, 43, 48, 46, 50, 52, 49, 54, 56],
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 132.75,
    change: +5.20,
    pct: +4.08,
    open: 127.55,
    high: 133.90,
    low: 126.80,
    spark: [25, 30, 35, 32, 42, 48, 45, 55, 60, 58, 65, 72],
  },
];

export default function StocksPage() {
  const gainers = stocks.filter((s) => s.change > 0).length;
  const losers = stocks.filter((s) => s.change < 0).length;
  const topGainer = [...stocks].sort((a, b) => b.pct - a.pct)[0];
  const topLoser = [...stocks].sort((a, b) => a.pct - b.pct)[0];

  return (
    <div className="p-6 pt-20 lg:pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-950 flex items-center justify-center">
          <TrendingUp className="text-green-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Stocks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your favorite stocks
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          label="Total"
          value={stocks.length.toString()}
          sub="stocks"
          icon={<Activity size={18} />}
          color="blue"
        />
        <SummaryCard
          label="Gainers"
          value={gainers.toString()}
          sub={`${((gainers / stocks.length) * 100).toFixed(0)}%`}
          icon={<TrendingUp size={18} />}
          color="green"
        />
        <SummaryCard
          label="Top Gainer"
          value={topGainer.ticker}
          sub={`+${topGainer.pct.toFixed(2)}%`}
          icon={<Award size={18} />}
          color="yellow"
        />
        <SummaryCard
          label="Top Loser"
          value={topLoser.ticker}
          sub={`${topLoser.pct.toFixed(2)}%`}
          icon={<TrendingDown size={18} />}
          color="red"
        />
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold dark:text-white">All Stocks</h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {stocks.length} tickers
        </span>
      </div>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stocks.map((s) => (
          <StockCard key={s.ticker} stock={s} />
        ))}
      </div>
    </div>
  );
}

/* ===== Summary Card ===== */
const summaryColors = {
  blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  green: 'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400',
  yellow: 'bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400',
  red: 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400',
} as const;

function SummaryCard({
  label,
  value,
  sub,
  icon,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: keyof typeof summaryColors;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${summaryColors[color]}`}
        >
          {icon}
        </div>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {sub}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-bold dark:text-white">{value}</p>
    </div>
  );
}