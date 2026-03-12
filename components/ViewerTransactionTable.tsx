'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown } from 'lucide-react'

type Transaction = {
  id: string
  bankName: string
  payee: string
  address: string
  dvNumber: string
  particulars: string
  amount: number
  date: string
  checkNumber?: string
  controlNumber: string
  accountCode: string
  debit: number
  credit: number
  remarks: string
  createdAt: string
  userId: string
  fund: string
  responsibilityCenter?: string
}

type ViewerTransactionTableProps = {
  transactions: Transaction[]
}

type SortField = 'date' | 'checkNumber' | 'dvNumber' | 'accountCode' | 'payee' | 'particulars' | 'amount' | 'remarks' | 'bankName' | 'controlNumber' | 'fund'

export default function ViewerTransactionTable({
  transactions,
}: ViewerTransactionTableProps) {
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const sortedTransactions = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]

      if (typeof aVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal)
      }

      return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })
    return sorted
  }, [transactions, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const SortableHeader = ({ label, field }: { label: string; field: SortField }) => (
    <th
      onClick={() => handleSort(field)}
      className="px-6 py-3 text-left text-sm font-semibold text-emerald-900 cursor-pointer hover:bg-emerald-100 transition-colors"
    >
      <div className="flex items-center gap-2">
        {label}
        {sortField === field && <ArrowUpDown className="w-4 h-4" />}
      </div>
    </th>
  )
  if (transactions.length === 0) {
    return (
      <div className="bg-white border border-emerald-100 rounded-lg p-8 text-center">
        <p className="text-gray-600">
          No transactions available. Select a data entry user to view their transactions.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-emerald-100 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-emerald-100 bg-emerald-100 sticky top-0">
              <SortableHeader label="Date" field="date" />
              <SortableHeader label="Check No." field="checkNumber" />
              <SortableHeader label="DV #" field="dvNumber" />
              <SortableHeader label="Account Code" field="accountCode" />
              <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900">Responsibility Center</th>
              <SortableHeader label="Payee" field="payee" />
              <SortableHeader label="Particulars" field="particulars" />
              <th className="px-4 py-3 text-right text-sm font-semibold text-emerald-900 cursor-pointer hover:bg-emerald-100 transition-colors" onClick={() => handleSort('amount')}>
                <div className="flex items-center gap-2 justify-end">
                  Amount
                  {sortField === 'amount' && <ArrowUpDown className="w-4 h-4" />}
                </div>
              </th>
              <SortableHeader label="Remarks" field="remarks" />
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((tx, idx) => (
              <tr
                key={tx.id}
                className={`border-b border-emerald-100 hover:bg-emerald-50 transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f6f0]'
                }`}
              >
                <td className="px-4 py-3 text-sm text-gray-900 font-medium whitespace-nowrap">
                  {new Date(tx.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{tx.checkNumber || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{tx.dvNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{tx.accountCode}</td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{tx.responsibilityCenter || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">{tx.payee}</td>
                <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                  {tx.particulars}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-900 font-semibold whitespace-nowrap">
                  ${tx.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{tx.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-emerald-50 border-t border-emerald-100 px-6 py-3">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-emerald-900">{transactions.length}</span> transactions
        </p>
      </div>
    </div>
  )
}
