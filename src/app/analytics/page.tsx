import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Target,
  Award,
} from 'lucide-react';

const topGainers = [
  { ticker: 'NVDA', pct: +4.08, price: 132.75 },
  { ticker: 'GOOGL', pct: +1.77, price: 178.42 },
  { ticker: 'AAPL', pct: +1.03, price: 229.87 },
];

const topLosers = [
  { ticker: 'TSLA', pct: -1.80, price: 248.90 },
  { ticker: 'MSFT', pct: -0.29, price: 421.15 },
  { ticker: 'META', pct: -0.15, price: 512.30 },
];

// Sparkline data بسيطة (نسبة لكل شهر)
const performance = [45, 62, 38, 71, 55, 88, 76, 92, 68, 84, 79, 95];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function AnalyticsPage() {
  const maxVal = Math.max(...performance);

  return (
    <div className="p-6 pt-20 lg:pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
          <BarChart3 className="text-indigo-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Portfolio performance &amp; insights
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          label="Total Value"
          value="$124,582"
          change="+8.4%"
          isUp
          icon={<DollarSign size={20} />}
          color="blue"
        />
        <KpiCard
          label="Today's P&L"
          value="+$1,240"
          change="+1.02%"
          isUp
          icon={<TrendingUp size={20} />}
          color="green"
        />
        <KpiCard
          label="Win Rate"
          value="68%"
          change="+3.2%"
          isUp
          icon={<Target size={20} />}
          color="purple"
        />
        <KpiCard
          label="Volatility"
          value="Medium"
          change="-0.4%"
          isUp={false}
          icon={<Activity size={20} />}
          color="orange"
        />
      </div>

      {/* Performance Chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold dark:text-white">
              Monthly Performance
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last 12 months
            </p>
          </div>
          <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
            <TrendingUp size={14} />
            +62.4% YTD
          </span>
        </div>

        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between gap-1.5 h-48">
          {performance.map((v, i) => {
            const height = (v / maxVal) * 100;
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div className="relative w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 group-hover:from-blue-600 group-hover:to-blue-500 transition-all"
                    style={{ height: `${height}%` }}
                    title={`${months[i]}: ${v}`}
                  />
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                  {months[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Gainers / Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RankCard
          title="Top Gainers"
          icon={<TrendingUp size={18} />}
          color="green"
          items={topGainers}
        />
        <RankCard
          title="Top Losers"
          icon={<TrendingDown size={18} />}
          color="red"
          items={topLosers}
        />
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <Award size={18} className="text-yellow-500" />
          <h2 className="font-semibold dark:text-white">Achievements</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'First Trade', done: true },
            { name: '+10% Return', done: true },
            { name: 'Diversified', done: true },
            { name: '100 Trades', done: false },
          ].map((a) => (
            <div
              key={a.name}
              className={`rounded-xl p-4 text-center border-2 ${
                a.done
                  ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/40'
                  : 'border-dashed border-gray-200 dark:border-zinc-800 opacity-50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  a.done
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-zinc-800'
                }`}
              >
                <Award size={18} />
              </div>
              <p
                className={`text-xs font-medium ${
                  a.done
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {a.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== KPI Card ===== */
const kpiColors = {
  blue:   'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  green:  'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400',
  purple: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
} as const;

function KpiCard({
  label,
  value,
  change,
  isUp,
  icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  isUp: boolean;
  icon: React.ReactNode;
  color: keyof typeof kpiColors;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpiColors[color]}`}
        >
          {icon}
        </div>
        <span
          className={`text-xs font-semibold ${
            isUp ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-bold dark:text-white">{value}</p>
    </div>
  );
}

/* ===== Rank Card ===== */
function RankCard({
  title,
  icon,
  color,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  color: 'green' | 'red';
  items: { ticker: string; pct: number; price: number }[];
}) {
  const isGreen = color === 'green';
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-4">
        <span className={isGreen ? 'text-green-600' : 'text-red-600'}>
          {icon}
        </span>
        <h2 className="font-semibold dark:text-white">{title}</h2>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.ticker}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition"
          >
            <span
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                isGreen
                  ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
              }`}
            >
              {idx + 1}
            </span>
            <div className="flex-1">
              <p className="font-semibold dark:text-white">{item.ticker}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <span
              className={`text-sm font-bold ${
                isGreen ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isGreen ? '+' : ''}
              {item.pct.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}