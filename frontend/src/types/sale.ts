export type PaymentMethod =
  | 'Cash'
  | 'M-Pesa'
  | 'Card'
  | 'Bank Transfer'

export interface Sale {
  id: string
  productId: string
  productName: string
  category: string
  customer: string
  quantity: number
  unitPrice: number
  unitCost: number
  paymentMethod: PaymentMethod
  createdAt: string
}

export function getSaleRevenue(sale: Sale): number {
  return sale.quantity * sale.unitPrice
}

export function getSaleCost(sale: Sale): number {
  return sale.quantity * sale.unitCost
}

export function getSaleProfit(sale: Sale): number {
  return getSaleRevenue(sale) - getSaleCost(sale)
}