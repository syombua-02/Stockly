import StatCard from '../components/StatCard'
import RevenueChart from '../components/RevenueChart'
import SalesChart from '../components/SalesChart'
import RecentTransactions from '../components/RecentTransactions'
import InventoryStatus from '../components/InventoryStatus'
import { useInventory } from '../hooks/useInventory'
import { getStockStatus } from '../types/product'

export default function Dashboard() {
  const { products } = useInventory()

  const totalProducts = products.length

  const totalUnits = products.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const lowStock = products.filter(
    product => getStockStatus(product) === 'Low Stock'
  ).length

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
          description="Sample revenue data"
        />

        <StatCard
          title="Total Products"
          value={String(totalProducts)}
          description={`${totalUnits} units available`}
        />

        <StatCard
          title="Total Sales"
          value="156"
          description="Sample sales data"
        />

        <StatCard
          title="Low Stock Items"
          value={String(lowStock)}
          description={
            lowStock > 0
              ? 'Requires restocking'
              : 'No low-stock products'
          }
        />

      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="min-w-0 xl:col-span-2">
          <RevenueChart />
        </div>

        <div className="min-w-0">
          <SalesChart />
        </div>

      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="min-w-0 xl:col-span-2">
          <RecentTransactions />
        </div>

        <div className="min-w-0">
          <InventoryStatus />
        </div>

      </section>

    </div>
  )
}