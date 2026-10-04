import { getDash } from '@/services/TicketApi';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';
import PriceChart from './components/charts/PriceChart';
import RangeBar from './components/charts/RangeBar';

export default async function Page() {
  const data = await getDash();
  const result = data?.results?.[0];

  if (!result) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          AAPL — Previous Close
        </h1>
        <p className="text-red-500">Failed to fetch data.</p>
      </div>
    );
  }

  const change = result.c - result.o;
  const changePct = (change / result.o) * 100;
  const isUp = change >= 0;

  return (
    <div className="p-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl font-bold dark:text-white">AAPL</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Previous Close
          </span>
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

      {/* ===== Main Price ===== */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Current Price
            </p>
            <p className="text-4xl font-bold dark:text-white">
              ${result.c.toFixed(2)}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
            <DollarSign
              size={28}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>
        </div>
      </div>

      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Close"
          value={result.c}
          color="red"
          icon={<ArrowDownRight size={18} />}
        />
        <StatCard
          label="Open"
          value={result.o}
          color="blue"
          icon={<ArrowUpRight size={18} />}
        />
        <StatCard
          label="High"
          value={result.h}
          color="green"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="Low"
          value={result.l}
          color="yellow"
          icon={<TrendingDown size={18} />}
        />
      </div>

      {/* ===== Range Bar ===== */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={18} className="text-blue-600 dark:text-blue-400" />
          <h2 className="font-semibold dark:text-white">
            Price Range (Low → High)
          </h2>
        </div>
        <RangeBar low={result.l} high={result.h} current={result.c} />
      </div>

      {/* ===== Charts ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Price Movement">
          <PriceChart data={result} />
        </ChartCard>

        <ChartCard title="Value Distribution">
          <PriceChart data={result} type="pie" />
        </ChartCard>
      </div>
    </div>
  );
}

/* ===== StatCard ===== */
const colorMap = {
  red: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    border: 'border-red-100 dark:border-red-900/50',
    text: 'text-red-600 dark:text-red-400',
    value: 'text-red-700 dark:text-red-300',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-100 dark:border-blue-900/50',
    text: 'text-blue-600 dark:text-blue-400',
    value: 'text-blue-700 dark:text-blue-300',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-950/40',
    border: 'border-green-100 dark:border-green-900/50',
    text: 'text-green-600 dark:text-green-400',
    value: 'text-green-700 dark:text-green-300',
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/40',
    border: 'border-yellow-100 dark:border-yellow-900/50',
    text: 'text-yellow-600 dark:text-yellow-400',
    value: 'text-yellow-700 dark:text-yellow-300',
  },
} as const;

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: keyof typeof colorMap;
  icon: React.ReactNode;
}) {
  const c = colorMap[color];

  return (
    <div
      className={`rounded-2xl p-5 border shadow-sm transition hover:shadow-md ${c.bg} ${c.border}`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className={`text-sm font-medium ${c.text}`}>{label}</p>
        <div className={c.text}>{icon}</div>
      </div>
      <p className={`text-2xl font-bold ${c.value}`}>${value.toFixed(2)}</p>
    </div>
  );
}

/* ===== ChartCard Wrapper ===== */
function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
      <h2 className="font-semibold mb-4 dark:text-white">{title}</h2>
      {children}
    </div>
  );
}