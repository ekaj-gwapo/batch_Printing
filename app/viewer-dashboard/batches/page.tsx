'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileText, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Batch {
  id: string
  batchName: string
  transactionCount: number
  totalAmount: number
  createdAt: string
}

export default function BatchesPage() {
  const router = useRouter()
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        // Get current user from session/auth
        const userResponse = await fetch('/api/auth/user')
        if (userResponse.ok) {
          const user = await userResponse.json()
          const viewerId = user.id
          
          // Fetch batches for this viewer
          const response = await fetch(`/api/batches?viewerId=${viewerId}`)
          if (response.ok) {
            const data = await response.json()
            setBatches(data)
          }
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching batches:', error)
        setLoading(false)
      }
    }

    fetchBatches()
  }, [])

  const handleViewBatch = (batchId: string) => {
    router.push(`/viewer-dashboard/batches/${batchId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-gray-600">Loading batches...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Transaction Batches</h1>
        <p className="text-gray-600">View and manage your transaction batches</p>
      </div>

      {/* Batches List */}
      {batches.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No batches found. Create a batch to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white rounded-lg border border-emerald-100 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{batch.batchName}</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Transactions</p>
                      <p className="text-xl font-semibold text-emerald-600">{batch.transactionCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Amount</p>
                      <p className="text-xl font-semibold text-emerald-600">
                        ₱{batch.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Created</p>
                      <p className="text-lg text-gray-700">{new Date(batch.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => handleViewBatch(batch.id)}
                    variant="outline"
                    className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    onClick={() => {
                      handleViewBatch(batch.id)
                      setTimeout(() => window.print(), 1000)
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
