export default function RangeBar({
  low,
  high,
  current,
}: {
  low: number;
  high: number;
  current: number;
}) {
  const range = high - low;
  const position = range === 0 ? 50 : ((current - low) / range) * 100;

  return (
    <div className="space-y-3">
      <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
        {/* Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all"
          style={{ left: `${position}%` }}
        >
          <div className="w-5 h-5 rounded-full bg-white border-4 border-blue-600 shadow-md" />
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Low</p>
          <p className="font-semibold text-red-600 dark:text-red-400">
            ${low.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
          <p className="font-semibold text-blue-600 dark:text-blue-400">
            ${current.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">High</p>
          <p className="font-semibold text-green-600 dark:text-green-400">
            ${high.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}