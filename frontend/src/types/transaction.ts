export interface Transaction {
  id: string
  customer: string
  product: string
  amount: number
  date: string
  status: 'Completed' | 'Pending' | 'Cancelled'
}