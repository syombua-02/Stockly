import { createContext } from 'react'
import type { Sale } from '../types/sale'

export interface SalesContextType {
  sales: Sale[]
  addSale: (sale: Sale) => void
}

export const SalesContext =
  createContext<SalesContextType | undefined>(undefined)