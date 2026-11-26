interface StatCardProps {
  title: string
  value: string
  description: string
}

export default function StatCard({
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-sm text-emerald-600">
        {description}
      </p>
    </div>
  )
}