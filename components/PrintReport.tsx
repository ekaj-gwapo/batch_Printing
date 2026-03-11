'use client'

import { forwardRef } from 'react'

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
  responsibilityCenter?: string
}

interface PrintReportProps {
  transactions: Transaction[]
  logo: string | null
  entryUserEmail: string
  batchId?: string
  fund?: string
  mophLocation?: string
}

const PrintReport = forwardRef<HTMLDivElement, PrintReportProps>(
  ({ transactions, logo, entryUserEmail, batchId, fund, mophLocation }, ref) => {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      }).format(amount)
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0)
    const totalDebit = transactions.reduce((sum, t) => sum + t.debit, 0)
    const totalCredit = transactions.reduce((sum, t) => sum + t.credit, 0)

    return (
      <div
        ref={ref}
        className="w-full bg-white p-6 font-serif print:p-4"
        style={{ minHeight: '100vh' }}
      >
        {/* Header Section */}
        <div className="grid grid-cols-12 gap-4 mb-8">
          {/* Logo Area - Left */}
          <div className="col-span-2">
            <div className="w-32 h-32 border-2 border-gray-400 flex items-center justify-center bg-gray-50">
              {logo ? (
                <img
                  src={logo}
                  alt="Organization Logo"
                  className="h-28 w-28 object-contain"
                />
              ) : (
                <p className="text-xs text-gray-400 text-center">Logo Here</p>
              )}
            </div>
          </div>

          {/* Title and Info - Right */}
          <div className="col-span-10">
            <div className="text-center mb-4">
              <h1 className="text-xs font-bold tracking-wide">REPUBLIC OF THE PHILIPPINES</h1>
              <h2 className="text-sm font-bold tracking-wider">PROVINCIAL GOVERNMENT OF MISAMIS ORIENTAL</h2>
            </div>
            <div className="text-center mb-4 border-t border-b border-gray-800 py-2">
              <h2 className="text-sm font-bold tracking-wider">REPORT OF CHECKS ISSUED</h2>
              <p className="text-xs text-gray-700 mt-1">Fund: {fund || mophLocation || 'GENERAL FUND'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-700"><span className="font-semibold">Month/Year:</span> {formatDate(new Date().toISOString())}</p>
              <p className="text-xs text-gray-700 mt-1"><span className="font-semibold">Entry User:</span> {entryUserEmail}</p>
              {batchId && (
                <p className="text-xs text-gray-700 mt-1"><span className="font-semibold">Batch ID:</span> {batchId}</p>
              )}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <table className="w-full text-xs border-collapse mb-8" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="border border-gray-800">
              <th className="border border-gray-800 py-2 px-2 font-bold text-center">Check Date</th>
              <th className="border border-gray-800 py-2 px-2 font-bold text-center">Check No.</th>
              <th className="border border-gray-800 py-2 px-2 font-bold text-center">DV No.</th>
              <th className="border border-gray-800 py-2 px-2 font-bold text-center">Account Code</th>
              <th className="border border-gray-800 py-2 px-2 font-bold text-left">Responsibility Center</th>
              <th className="border border-gray-800 py-2 px-2 font-bold text-left">Name of Payee</th>
              <th className="border border-gray-800 py-2 px-2 font-bold text-left">Nature of Payment</th>
              <th className="border border-gray-800 py-2 px-2 font-bold text-center">Amount</th>
              <th className="border border-gray-800 py-2 px-2 font-bold text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className="border border-gray-800">
                <td className="border border-gray-800 py-2 px-2 text-center">{formatDate(transaction.date).substring(0, 10)}</td>
                <td className="border border-gray-800 py-2 px-2 text-center">{transaction.checkNumber || '-'}</td>
                <td className="border border-gray-800 py-2 px-2 text-center">{transaction.dvNumber}</td>
                <td className="border border-gray-800 py-2 px-2 text-center">{transaction.accountCode}</td>
                <td className="border border-gray-800 py-2 px-2">
                  <div className="text-xs font-semibold">{transaction.responsibilityCenter || '-'}</div>
                  <div className="text-xs">{transaction.payee}</div>
                </td>
                <td className="border border-gray-800 py-2 px-2 text-xs">{transaction.particulars}</td>
                <td className="border border-gray-800 py-2 px-2 text-right text-xs font-semibold">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="border border-gray-800 py-2 px-2 text-xs">{transaction.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border border-gray-800 font-bold">
              <td colSpan={6} className="border border-gray-800 py-2 px-2 text-right">
                TOTAL:
              </td>
              <td className="border border-gray-800 py-2 px-2 text-right font-semibold">
                {formatCurrency(totalAmount)}
              </td>
              <td className="border border-gray-800 py-2 px-2"></td>
            </tr>
          </tfoot>
        </table>

        {/* Footer Section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="grid grid-cols-3 gap-12 text-center text-xs">
            <div>
              <p className="h-12 border-b border-gray-800"></p>
              <p className="mt-2 font-semibold">Prepared By</p>
              <p className="text-xs text-gray-600">Entry User</p>
            </div>
            <div>
              <p className="h-12 border-b border-gray-800"></p>
              <p className="mt-2 font-semibold">Reviewed By</p>
              <p className="text-xs text-gray-600">Checker</p>
            </div>
            <div>
              <p className="h-12 border-b border-gray-800"></p>
              <p className="mt-2 font-semibold">Approved By</p>
              <p className="text-xs text-gray-600">Provincial Treasurer</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

PrintReport.displayName = 'PrintReport'

export default PrintReport
