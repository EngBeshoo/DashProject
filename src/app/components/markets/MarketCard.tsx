import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import Sparkline from '../stocks/Sparkline';

export type Market = {
  name: string;
  value: number;
  change: number;
  pct: number;
  high: number;
  low: number;
  volume: number;
  region: string;
  flag: string;
  currency: string;
  open: boolean;
  spark: number[];
};

function formatValue(v: number): string {
  return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function formatVolume(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toString();
}

export default function MarketCard({ market }: { market: Market }) {
  const isUp = market.change >= 0;
  const range = market.high - market.low;
  const position =
    range === 0 ? 50 : ((market.value - market.low) / range) * 100;

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      {/* Header: Flag + Name + Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-3xl shrink-0">{market.flag}</span>
          <div className="min-w-0">
            <p className="font-bold text-base dark:text-white truncate">
              {market.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {market.region} · {market.currency}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <span
          className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${
            market.open
              ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
              : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              market.open ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}
          />
          {market.open ? 'Open' : 'Closed'}
        </span>
      </div>

      {/* Value */}
      <div className="mb-3">
        <p className="text-2xl font-bold dark:text-white">
          {formatValue(market.value)}
        </p>
        <div
          className={`flex items-center gap-1 text-sm font-medium mt-1 ${
            isUp ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isUp ? '+' : ''}
          {market.change.toFixed(2)} ({isUp ? '+' : ''}
          {market.pct.toFixed(2)}%)
        </div>
      </div>

      {/* Sparkline */}
      <div className="mb-4">
        <Sparkline
          data={market.spark}
          color={isUp ? '#22c55e' : '#ef4444'}
        />
      </div>

      {/* Range bar */}
      <div className="mb-4">
        <div className="relative h-1.5 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-blue-600 shadow-sm"
            style={{ left: `${position}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-1">
          <span>L: {formatValue(market.low)}</span>
          <span>H: {formatValue(market.high)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-zinc-800">
        <div>
          <p className="text-[10px] uppercase text-gray-400 dark:text-gray-500">
            Volume
          </p>
          <p className="text-xs font-semibold dark:text-white">
            {formatVolume(market.volume)}
          </p>
        </div>
        <Clock size={14} className="text-gray-300 dark:text-gray-600" />
      </div>
    </div>
  );
}