import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const salesData = [
  { name: 'Clothing', value: 40 },
  { name: 'Accessories', value: 25 },
  { name: 'Footwear', value: 20 },
  { name: 'Other', value: 15 },
]

const colors = [
  '#059669',
  '#34d399',
  '#94a3b8',
  '#cbd5e1',
]

export default function SalesChart() {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold text-slate-900">
        Sales by Category
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Product category performance
      </p>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={salesData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {salesData.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={colors[index]}
                />
              ))}
            </Pie>

            <Tooltip formatter={(value) => `${value}%`} />

          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {salesData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">

              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              />

              <span className="text-sm text-slate-600">
                {item.name}
              </span>

            </div>

            <span className="text-sm font-semibold text-slate-900">
              {item.value}%
            </span>
          </div>
        ))}
      </div>

    </section>
  )
}