import { ShoppingCart } from 'lucide-react'
import type { Sale } from '../types/sale'
import {
  getSaleRevenue,
  getSaleProfit,
} from '../types/sale'
import { formatCurrency } from '../utils/formatCurrency'

interface SalesTableProps {
  sales: Sale[]
}

export default function SalesTable({
  sales,
}: SalesTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[950px] text-left text-sm">

          <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">

            <tr>
              {[
                'Sale ID',
                'Product',
                'Customer',
                'Quantity',
                'Revenue',
                'Gross Profit',
                'Payment',
                'Date',
              ].map(heading => (
                <th
                  key={heading}
                  className="p-4 font-medium"
                >
                  {heading}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {sales.map(sale => (
              <tr
                key={sale.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >

                <td className="p-4 font-medium text-slate-900">
                  {sale.id.slice(0, 8).toUpperCase()}
                </td>

                <td className="p-4">
                  <p className="font-semibold text-slate-900">
                    {sale.productName}
                  </p>

                  <p className="text-xs text-slate-400">
                    {sale.category}
                  </p>
                </td>

                <td className="p-4 text-slate-600">
                  {sale.customer}
                </td>

                <td className="p-4">
                  {sale.quantity}
                </td>

                <td className="p-4 font-semibold whitespace-nowrap">
                  {formatCurrency(getSaleRevenue(sale))}
                </td>

                <td className={`p-4 font-semibold whitespace-nowrap ${
                  getSaleProfit(sale) >= 0
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}>
                  {formatCurrency(getSaleProfit(sale))}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium whitespace-nowrap">
                    {sale.paymentMethod}
                  </span>
                </td>

                <td className="p-4 whitespace-nowrap text-slate-500">
                  {new Date(sale.createdAt).toLocaleDateString('en-GB')}
                </td>

              </tr>
            ))}

            {sales.length === 0 && (
              <tr>
                <td colSpan={8} className="p-12 text-center">

                  <ShoppingCart
                    size={40}
                    className="mx-auto mb-4 text-slate-300"
                  />

                  <p className="font-semibold text-slate-700">
                    No sales found
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Sales matching your criteria will appear here.
                  </p>

                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  )
}