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
  bankName?: string
  accountNumber?: string
}

const PrintReport = forwardRef<HTMLDivElement, PrintReportProps>(
  ({ transactions, logo, entryUserEmail, batchId, fund, bankName, accountNumber }, ref) => {

    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0)

    return (

      <div ref={ref} className="w-full bg-white p-8 font-serif text-[12px]">

        {/* HEADER */}

        <div className="text-center leading-tight mb-6">
          <p>Republic of the Philippines</p>
          <p className="font-bold">PROVINCIAL GOVERNMENT</p>
          <p className="font-bold">OFFICE OF THE PROVINCIAL TREASURER</p>

          <p className="font-bold text-lg mt-3">
            REPORT OF CHECKS ISSUED
          </p>

        </div>

        {/* BANK INFO */}

        <div className="flex justify-between mb-4 text-sm">

          <div>

            <p><span className="font-semibold">Bank Name:</span> {bankName || "DEVELOPMENT BANK OF THE PHILIPPINES"}</p>

            <p><span className="font-semibold">Account No.:</span> {accountNumber || "___________"}</p>

          </div>

          <div className="text-right">

            <p><span className="font-semibold">Fund:</span> {fund || "GENERAL FUND"}</p>

            <p><span className="font-semibold">Month/Year:</span> {new Date().toLocaleDateString()}</p>

          </div>

        </div>

        {/* TABLE */}

        <table className="w-full border border-black border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="border border-black p-1">Date</th>

              <th className="border border-black p-1">Check No.</th>

              <th className="border border-black p-1">DV No.</th>

              <th className="border border-black p-1">Account Code</th>

              <th className="border border-black p-1">Resp. Center</th>

              <th className="border border-black p-1">Name of Payee</th>

              <th className="border border-black p-1">Nature of Payment</th>

              <th className="border border-black p-1">Amount</th>

              <th className="border border-black p-1">Remarks</th>

            </tr>

          </thead>

          <tbody>

            {transactions.length > 0 ? (

              transactions.map((t) => (

                <tr key={t.id}>

                  <td className="border border-black p-1 text-center">

                    {new Date(t.date).toLocaleDateString()}

                  </td>

                  <td className="border border-black p-1 text-center">

                    {t.checkNumber}

                  </td>

                  <td className="border border-black p-1 text-center">

                    {t.dvNumber}

                  </td>

                  <td className="border border-black p-1 text-center">

                    {t.accountCode}

                  </td>

                  <td className="border border-black p-1 text-center">

                    {t.responsibilityCenter}

                  </td>

                  <td className="border border-black p-1">

                    {t.payee}

                  </td>

                  <td className="border border-black p-1">

                    {t.particulars}

                  </td>

                  <td className="border border-black p-1 text-right">

                    {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}

                  </td>

                  <td className="border border-black p-1">

                    {t.remarks}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan={9} className="text-center p-3 border">

                  No transactions to display

                </td>

              </tr>

            )}

          </tbody>

          <tfoot>

            <tr>

              <td colSpan={7} className="border border-black p-1 text-right font-bold">



              </td>

              <td className="border border-black p-1 text-right font-bold">

                {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}

              </td>

              <td className="border border-black"></td>

            </tr>

          </tfoot>

        </table>

        {/* FOOTER */}

        <div className="grid grid-cols-3 gap-10 text-center mt-16">

          <div>

            <div className="border-b border-black h-10"></div>

            <p className="mt-2 font-semibold">Prepared By</p>

            <p>{entryUserEmail}</p>

          </div>

          <div>

            <div className="border-b border-black h-10"></div>

            <p className="mt-2 font-semibold">Reviewed By</p>

            <p>Checker</p>

          </div>

          <div>

            <div className="border-b border-black h-10"></div>

            <p className="mt-2 font-semibold">Approved By</p>

            <p>Provincial Treasurer</p>

          </div>

        </div>

        {/* BATCH INFO */}

        <div className="mt-10 text-xs text-gray-600">

          <p>Batch ID: {batchId}</p>

        </div>

      </div>

    )

  })

PrintReport.displayName = 'PrintReport'

export default PrintReport