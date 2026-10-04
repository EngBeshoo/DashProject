import { Bell, TrendingUp, TrendingDown, Clock, Check } from 'lucide-react';

const alerts = [
  {
    id: 1,
    ticker: 'AAPL',
    type: 'above',
    target: 230,
    current: 229.87,
    status: 'pending',
    created: '2 hours ago',
  },
  {
    id: 2,
    ticker: 'TSLA',
    type: 'below',
    target: 245,
    current: 248.90,
    status: 'pending',
    created: '5 hours ago',
  },
  {
    id: 3,
    ticker: 'BTC',
    type: 'above',
    target: 68000,
    current: 67234.12,
    status: 'triggered',
    created: '1 day ago',
  },
  {
    id: 4,
    ticker: 'NVDA',
    type: 'above',
    target: 130,
    current: 132.75,
    status: 'triggered',
    created: '2 days ago',
  },
];

export default function AlertsPage() {
  const pending = alerts.filter((a) => a.status === 'pending');
  const triggered = alerts.filter((a) => a.status === 'triggered');

  return (
    <div className="p-6 pt-20 lg:pt-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950 flex items-center justify-center">
          <Bell className="text-red-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Alerts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {pending.length} pending · {triggered.length} triggered
          </p>
        </div>
      </div>

      {/* Pending */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Pending
        </h2>
        {pending.length === 0 ? (
          <p className="text-sm text-gray-400">No pending alerts</p>
        ) : (
          <div className="space-y-3">
            {pending.map((a) => (
              <AlertRow key={a.id} alert={a} />
            ))}
          </div>
        )}
      </section>

      {/* Triggered */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Triggered
        </h2>
        <div className="space-y-3">
          {triggered.map((a) => (
            <AlertRow key={a.id} alert={a} />
          ))}
        </div>
      </section>
    </div>
  );
}

function AlertRow({ alert }: { alert: (typeof alerts)[0] }) {
  const isAbove = alert.type === 'above';
  const isTriggered = alert.status === 'triggered';

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow border border-gray-100 dark:border-zinc-800 flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isTriggered
            ? 'bg-green-50 dark:bg-green-950 text-green-600'
            : 'bg-blue-50 dark:bg-blue-950 text-blue-600'
        }`}
      >
        {isTriggered ? (
          <Check size={20} />
        ) : isAbove ? (
          <TrendingUp size={20} />
        ) : (
          <TrendingDown size={20} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold dark:text-white">
          {alert.ticker} — Price {isAbove ? 'above' : 'below'} ${alert.target}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
          <Clock size={12} />
          {alert.created} · Current: ${alert.current.toLocaleString()}
        </div>
      </div>

      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          isTriggered
            ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
        }`}
      >
        {isTriggered ? 'Triggered' : 'Pending'}
      </span>
    </div>
  );
}