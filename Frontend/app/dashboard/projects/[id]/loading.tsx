export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-64 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}
