import { useState } from 'react'
import type { FormEvent } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { useInventory } from '../hooks/useInventory'
import { useSales } from '../hooks/useSales'
import type { PaymentMethod } from '../types/sale'
import { formatCurrency } from '../utils/formatCurrency'

interface SaleFormProps {
  onClose: () => void
}

export default function SaleForm({
  onClose,
}: SaleFormProps) {
  const { products } = useInventory()
  const { recordSale } = useSales()

  const [productId, setProductId] = useState('')
  const [customer, setCustomer] = useState('')
  const [quantity, setQuantity] = useState('1')

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('M-Pesa')

  const [error, setError] = useState('')

  const availableProducts = products.filter(
    product => product.quantity > 0
  )

  const selectedProduct = availableProducts.find(
    product => product.id === productId
  )

  const units = Number(quantity)

  const validQuantity =
    Number.isInteger(units) &&
    units > 0 &&
    units <= (selectedProduct?.quantity ?? 0)

  const revenue = validQuantity && selectedProduct
    ? selectedProduct.sellingPrice * units
    : 0

  const cost = validQuantity && selectedProduct
    ? selectedProduct.costPrice * units
    : 0

  const profit = revenue - cost

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    try {
      recordSale({
        productId,
        customer,
        quantity: units,
        paymentMethod,
      })

      onClose()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to record sale.'
      )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sale-form-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>
            <h2
              id="sale-form-title"
              className="text-xl font-bold text-slate-900"
            >
              Record Sale
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new sales transaction.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sale form"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          {error && (
            <div
              role="alert"
              className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {availableProducts.length === 0 && (
            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
              No products are currently available for sale.
              Please restock your inventory.
            </div>
          )}

          <div>
            <label
              htmlFor="sale-product"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Select Product
            </label>

            <select
              id="sale-product"
              required
              value={productId}
              onChange={event => {
                setProductId(event.target.value)
                setQuantity('1')
                setError('')
              }}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            >
              <option value="">Choose a product</option>

              {availableProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} — {product.quantity} available
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">

              <div>
                <p className="text-xs text-slate-500">
                  Unit Price
                </p>

                <p className="mt-1 font-semibold">
                  {formatCurrency(selectedProduct.sellingPrice)}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Available Stock
                </p>

                <p className="mt-1 font-semibold">
                  {selectedProduct.quantity} units
                </p>
              </div>

            </div>
          )}

          <div>
            <label
              htmlFor="sale-customer"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Customer Name
            </label>

            <input
              id="sale-customer"
              type="text"
              placeholder="Walk-in Customer"
              value={customer}
              onChange={event => setCustomer(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="sale-quantity"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Quantity
            </label>

            <input
              id="sale-quantity"
              type="number"
              required
              min={1}
              step={1}
              max={selectedProduct?.quantity}
              value={quantity}
              onChange={event => setQuantity(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />

            {selectedProduct && units > selectedProduct.quantity && (
              <p className="mt-2 text-sm text-red-600">
                Quantity exceeds available stock.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="sale-payment"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Payment Method
            </label>

            <select
              id="sale-payment"
              value={paymentMethod}
              onChange={event =>
                setPaymentMethod(event.target.value as PaymentMethod)
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            >
              <option value="Cash">Cash</option>
              <option value="M-Pesa">M-Pesa</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-50 p-5">

            <h3 className="font-semibold text-emerald-800">
              Transaction Summary
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Revenue</span>
              <span className="font-semibold">
                {formatCurrency(revenue)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Product Cost</span>
              <span className="font-semibold">
                {formatCurrency(cost)}
              </span>
            </div>

            <div className="flex justify-between border-t border-emerald-200 pt-3">
              <span className="font-semibold">Gross Profit</span>

              <span className={`font-bold ${
                profit >= 0
                  ? 'text-emerald-700'
                  : 'text-red-600'
              }`}>
                {formatCurrency(profit)}
              </span>
            </div>

          </div>

          <div className="flex flex-wrap justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!selectedProduct || !validQuantity}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart size={18} />
              Confirm Sale
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}