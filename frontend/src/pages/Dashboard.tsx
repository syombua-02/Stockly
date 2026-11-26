import StatCard from '../components/StatCard'

export default function Dashboard() {
  return (
    <div>
      <section className="mb-8">
        <p className="text-sm font-medium text-emerald-600">
          Business overview
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Here's how your business is performing.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Revenue"
          value="KSh 124,500"
          description="+12.5% this month"
        />

        <StatCard
          title="Total Products"
          value="248"
          description="18 new products"
        />

        <StatCard
          title="Total Sales"
          value="156"
          description="+8.2% this month"
        />

        <StatCard
          title="Low Stock Items"
          value="12"
          description="Requires attention"
        />

      </section>
    </div>
  )
}