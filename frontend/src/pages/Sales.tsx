import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import StatCard from '../components/StatCard'
import SalesTable from '../components/SalesTable'
import { useSales } from '../hooks/useSales'
import {
  getSaleRevenue,
  getSaleProfit,
} from '../types/sale'
import { formatCurrency } from '../utils/formatCurrency'

export default function Sales() {
  const { sales } = useSales()

  const [search, setSearch] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('All')

  const totalRevenue = sales.reduce(
    (total, sale) => total + getSaleRevenue(sale),
    0
  )

  const totalProfit = sales.reduce(
    (total, sale) => total + getSaleProfit(sale),
    0
  )

  const totalUnits = sales.reduce(
    (total, sale) => total + sale.quantity,
    0
  )

  const filteredSales = sales.filter(sale => {
    const query = search.trim().toLowerCase()

    const matchesSearch =
      sale.productName.toLowerCase().includes(query) ||
      sale.customer.toLowerCase().includes(query) ||
      sale.id.toLowerCase().includes(query)

    const matchesPayment =
      paymentMethod === 'All' ||
      sale.paymentMethod === paymentMethod

    return matchesSearch && matchesPayment
  })

  return (
    <div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-emerald-600">
            Transaction management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Sales
          </h1>

          <p className="mt-2 text-slate-500">
            Record transactions and monitor business revenue.
          </p>
        </div>

        <button
          onClick={() => alert('Sale form coming next')}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <Plus size={20} />
          Record Sale
        </button>

      </div>

      <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          description="All recorded sales"
        />

        <StatCard
          title="Gross Profit"
          value={formatCurrency(totalProfit)}
          description="Revenue minus product costs"
        />

        <StatCard
          title="Transactions"
          value={String(sales.length)}
          description="Recorded transactions"
        />

        <StatCard
          title="Units Sold"
          value={String(totalUnits)}
          description="Total products sold"
        />

      </section>

      <section className="mb-5 flex flex-wrap gap-4">

        <div className="relative min-w-[180px] flex-1">

          <Search
            size={20}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="search"
            aria-label="Search sales"
            placeholder="Search transactions..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500"
          />

        </div>

        <select
          aria-label="Filter by payment method"
          value={paymentMethod}
          onChange={event => setPaymentMethod(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
        >
          <option value="All">All Payment Methods</option>
          <option value="Cash">Cash</option>
          <option value="M-Pesa">M-Pesa</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

      </section>

      <SalesTable sales={filteredSales} />

      <p className="mt-4 text-sm text-slate-500">
        Showing {filteredSales.length} of {sales.length} transactions
      </p>

    </div>
  )
}