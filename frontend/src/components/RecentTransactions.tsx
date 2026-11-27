import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Transaction } from '../types/transaction'
import { formatCurrency } from '../utils/formatCurrency'

const transactions: Transaction[] = [
  {
    id: 'ORD-001',
    customer: 'Sarah Wanjiku',
    product: 'Classic Blazer',
    amount: 4500,
    date: '27 Nov 2026',
    status: 'Completed',
  },
  {
    id: 'ORD-002',
    customer: 'James Kamau',
    product: 'Leather Loafers',
    amount: 3800,
    date: '26 Nov 2026',
    status: 'Pending',
  },
  {
    id: 'ORD-003',
    customer: 'Faith Achieng',
    product: 'Shoulder Bag',
    amount: 2500,
    date: '26 Nov 2026',
    status: 'Completed',
  },
  {
    id: 'ORD-004',
    customer: 'Brian Otieno',
    product: 'Linen Trousers',
    amount: 3200,
    date: '25 Nov 2026',
    status: 'Cancelled',
  },
  {
    id: 'ORD-005',
    customer: 'Mary Njeri',
    product: 'Ballet Flats',
    amount: 4200,
    date: '25 Nov 2026',
    status: 'Completed',
  },
]

const statusStyles = {
  Completed: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Cancelled: 'bg-red-50 text-red-700',
}

export default function RecentTransactions() {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest business transactions
          </p>
        </div>

        <Link
          to="/sales"
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-800"
        >
          View all
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[650px] text-left text-sm">

          <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(transaction => (
              <tr
                key={transaction.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="p-4 font-medium text-slate-900">
                  {transaction.id}
                </td>

                <td className="p-4 text-slate-600">
                  {transaction.customer}
                </td>

                <td className="p-4 text-slate-600">
                  {transaction.product}
                </td>

                <td className="p-4 font-semibold text-slate-900">
                  {formatCurrency(transaction.amount)}
                </td>

                <td className="p-4 whitespace-nowrap text-slate-500">
                  {transaction.date}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[transaction.status]
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </section>
  )
}