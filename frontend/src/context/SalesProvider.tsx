import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Sale } from '../types/sale'
import type { SaleInput } from './SalesContext'
import { SalesContext } from './SalesContext'
import { useInventory } from '../hooks/useInventory'

const STORAGE_KEY = 'stockly_sales'

interface SalesProviderProps {
  children: ReactNode
}

export default function SalesProvider({
  children,
}: SalesProviderProps) {
  const { products, updateProduct } = useInventory()

  const [sales, setSales] = useState<Sale[]>(() => {
    try {
      const savedSales = localStorage.getItem(STORAGE_KEY)

      return savedSales ? JSON.parse(savedSales) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sales)
    )
  }, [sales])

  function recordSale(input: SaleInput) {
    const product = products.find(
      item => item.id === input.productId
    )

    if (!product) {
      throw new Error('The selected product does not exist.')
    }

    if (
      !Number.isInteger(input.quantity) ||
      input.quantity <= 0
    ) {
      throw new Error('Please enter a valid quantity.')
    }

    if (input.quantity > product.quantity) {
      throw new Error('Insufficient stock available.')
    }

    const sale: Sale = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      category: product.category,
      customer: input.customer.trim() || 'Walk-in Customer',
      quantity: input.quantity,
      unitPrice: product.sellingPrice,
      unitCost: product.costPrice,
      paymentMethod: input.paymentMethod,
      createdAt: new Date().toISOString(),
    }

    updateProduct({
      ...product,
      quantity: product.quantity - input.quantity,
    })

    setSales(previous => [sale, ...previous])
  }

  return (
    <SalesContext.Provider
      value={{
        sales,
        recordSale,
      }}
    >
      {children}
    </SalesContext.Provider>
  )
}