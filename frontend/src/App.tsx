import StatCard from './components/StatCard'

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-emerald-700">
          Stockly.
        </h1>

        <p className="mt-1 text-slate-500">
          Inventory & Business Analytics
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">
          Dashboard Overview
        </h2>

        <p className="mt-1 text-slate-500">
          Here's how your business is performing.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

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

    </main>
  )
}