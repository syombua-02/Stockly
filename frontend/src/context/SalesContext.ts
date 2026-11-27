import { createContext } from 'react'
import type { Sale, PaymentMethod } from '../types/sale'

export interface SaleInput {
  productId: string
  customer: string
  quantity: number
  paymentMethod: PaymentMethod
}

export interface SalesContextType {
  sales: Sale[]
  recordSale: (input: SaleInput) => void
}

export const SalesContext =
  createContext<SalesContextType | undefined>(undefined)