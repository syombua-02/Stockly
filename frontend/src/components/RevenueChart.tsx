import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 62000 },
  { month: 'Mar', revenue: 54000 },
  { month: 'Apr', revenue: 81000 },
  { month: 'May', revenue: 76000 },
  { month: 'Jun', revenue: 98000 },
  { month: 'Jul', revenue: 89000 },
  { month: 'Aug', revenue: 112000 },
  { month: 'Sep', revenue: 105000 },
  { month: 'Oct', revenue: 118000 },
  { month: 'Nov', revenue: 124500 },
]

export default function RevenueChart() {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Revenue Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monthly business revenue
        </p>
      </div>

      <div className="mb-6">
        <p className="text-3xl font-bold text-slate-900">
          KSh 124,500
        </p>

        <p className="mt-1 text-sm font-medium text-emerald-600">
          Latest monthly revenue
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>

            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#10b981"
                  stopOpacity={0.3}
                />

                <stop
                  offset="95%"
                  stopColor="#10b981"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) =>
                `KSh ${Number(value).toLocaleString()}`
              }
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#059669"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

    </section>
  )
}