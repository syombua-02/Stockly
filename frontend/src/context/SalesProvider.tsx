import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Sale } from '../types/sale'
import { SalesContext } from './SalesContext'

const STORAGE_KEY = 'stockly_sales'

interface SalesProviderProps {
  children: ReactNode
}

export default function SalesProvider({
  children,
}: SalesProviderProps) {
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

  function addSale(sale: Sale) {
    setSales(previous => [sale, ...previous])
  }

  return (
    <SalesContext.Provider
      value={{
        sales,
        addSale,
      }}
    >
      {children}
    </SalesContext.Provider>
  )
}