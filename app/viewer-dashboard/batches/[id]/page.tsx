'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Printer, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PrintReport from '@/components/PrintReport'

interface Transaction {
  id: string
  bankName: string
  payee: string
  dvNumber: string
  particulars: string
  amount: number
  date: string
  checkNumber?: string
  accountCode: string
  debit: number
  credit: number
  remarks?: string
  fund: string
  responsibilityCenter?: string
}

interface Batch {
  id: string
  batchName: string
  transactionCount: number
  totalAmount: number
  createdAt: string
}

export default function BatchDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const batchId = params.id as string
  
  const [batch, setBatch] = useState<Batch | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [entryUserEmail, setEntryUserEmail] = useState('')
  const [selectedFund, setSelectedFund] = useState('')
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        // Get current user
        const userResponse = await fetch('/api/auth/user')
        if (!userResponse.ok) {
          setLoading(false)
          return
        }
        
        const user = await userResponse.json()
        const viewerId = user.id
        
        const response = await fetch(`/api/batches/${batchId}`)
        if (response.ok) {
          const data = await response.json()
          setTransactions(data.transactions)
          
          // Get batch metadata
          const batchResponse = await fetch(`/api/batches?viewerId=${viewerId}`)
          if (batchResponse.ok) {
            const batches = await batchResponse.json()
            const currentBatch = batches.find((b: any) => b.id === batchId)
            if (currentBatch) {
              setBatch(currentBatch)
              // Extract fund from first transaction or from batch
              if (data.transactions.length > 0) {
                setSelectedFund(data.transactions[0].fund || '')
              }
            }
          }
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching batch details:', error)
        setLoading(false)
      }
    }

    if (batchId) {
      fetchBatchDetails()
    }
  }, [batchId])

  const handlePrint = () => {
    setTimeout(() => {
      window.print()
    }, 500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-gray-600">Loading batch details...</p>
      </div>
    )
  }

  if (!batch) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
        <p className="text-gray-600">Batch not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white p-8 print:p-0">
      {/* Header - Hidden on Print */}
      <div className="print:hidden mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Batches
        </Button>
        
        <div className="bg-white rounded-lg p-6 border border-emerald-100 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{batch.batchName}</h1>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Transaction Count</p>
              <p className="text-2xl font-bold text-emerald-600">{batch.transactionCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-emerald-600">₱{batch.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Created</p>
              <p className="text-lg text-gray-700">{new Date(batch.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Report
          </Button>
        </div>

        {/* Batch Transactions Table - Hidden on Print */}
        <div className="bg-white rounded-lg border border-emerald-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-emerald-50 border-b border-emerald-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Check No.</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Payee</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Particulars</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm">{tx.checkNumber || '-'}</td>
                  <td className="py-3 px-4 text-sm">{tx.payee}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{tx.particulars}</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold">₱{tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-emerald-50 font-bold border-t-2 border-emerald-200">
                <td colSpan={4} className="py-3 px-4 text-right">TOTAL:</td>
                <td className="py-3 px-4 text-right">₱{transactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Print Report - Visible only on Print */}
      <div className="hidden print:block">
        <PrintReport
          ref={printRef}
          transactions={transactions}
          entryUserEmail={entryUserEmail}
          logo={null}
          batchId={batch.id}
          fund={selectedFund}
          mophLocation={selectedFund}
        />
      </div>
    </div>
  )
}
