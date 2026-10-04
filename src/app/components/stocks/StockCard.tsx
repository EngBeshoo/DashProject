import Link from 'next/link';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import Sparkline from '../stocks/Sparkline';

export type Stock = {
  ticker: string;
  name: string;
  price: number;
  change: number;
  pct: number;
  open: number;
  high: number;
  low: number;
  spark: number[];
};

export default function StockCard({ stock }: { stock: Stock }) {
  const isUp = stock.change >= 0;
  const range = stock.high - stock.low;
  const position =
    range === 0 ? 50 : ((stock.price - stock.low) / range) * 100;

  return (
    <Link
      href={`/stocks/${stock.ticker}`}
      className="group bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 block"
    >
      {/* Header: Ticker + Name + Arrow */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-bold text-lg dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            {stock.ticker}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
            {stock.name}
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition">
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <p className="text-2xl font-bold dark:text-white">
          ${stock.price.toFixed(2)}
        </p>
        <div
          className={`flex items-center gap-1 text-sm font-medium mt-1 ${
            isUp ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isUp ? '+' : ''}
          {stock.change.toFixed(2)} ({isUp ? '+' : ''}
          {stock.pct.toFixed(2)}%)
        </div>
      </div>

      {/* Sparkline */}
      <div className="mb-4">
        <Sparkline
          data={stock.spark}
          color={isUp ? '#22c55e' : '#ef4444'}
        />
      </div>

      {/* Range bar */}
      <div className="space-y-1">
        <div className="relative h-1.5 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-blue-600 shadow-sm"
            style={{ left: `${position}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
          <span>L: ${stock.low.toFixed(2)}</span>
          <span>H: ${stock.high.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}