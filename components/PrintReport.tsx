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

<div className="flex flex-col items-center mb-6 relative">
  <div className="flex items-center justify-center gap-4 w-full">
    <img src="/logos/logo3.jpg" alt="Logo" className="w-16 h-16 object-contain" />
    <div className="text-center leading-tight">
      <p>Republic of the Philippines</p>
      <p className="font-bold uppercase">PROVINCIAL GOVERNMENT OF MISAMIS ORIENTAL</p>
      <p className="font-bold uppercase">OFFICE OF THE PROVINCIAL TREASURER</p>
    </div>
  </div>

  <div className="text-center mt-6">
    <p className="font-bold text-base leading-tight">REPORT OF</p>
    <p className="font-bold text-base leading-tight">CHECKS ISSUED</p>
    <p className="font-bold text-sm mt-1">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}</p>
  </div>
</div>

{/* BANK INFO */}

<div className="flex justify-between items-end mb-2 text-xs">
  <div>
    <div className="grid grid-cols-[80px_1fr] gap-2 items-end mb-1">
      <p className="leading-tight text-gray-700">Bank<br/>Name:</p>
      <p className="font-bold border-b border-black uppercase whitespace-nowrap">{bankName || "DEVELOPMENT BANK OF THE PHILIPPINES"}</p>
    </div>
    <div className="grid grid-cols-[80px_1fr] gap-2 items-end">
      <p className="leading-tight text-gray-700">Account No.:</p>
      <p className="font-bold border-b border-black uppercase whitespace-nowrap">{accountNumber || "-"}</p>
    </div>
  </div>
  <div className="text-right mb-1">
    <p>Fund: <span className="font-bold uppercase border-b border-black inline-block min-w-[150px] text-center">{fund || "GENERAL FUND"}</span></p>
  </div>
</div>

{/* TABLE */}

<table className="w-full border border-black border-collapse">

<thead>
  <tr className="bg-blue-50 text-center">
    <th className="border border-black p-1 font-normal" colSpan={2}>Check</th>
    <th className="border border-black p-1 font-normal" rowSpan={2}>DV<br/>No.</th>
    <th className="border border-black p-1 font-normal" rowSpan={2}>Account<br/>Code</th>
    <th className="border border-black p-1 font-normal" rowSpan={2}>Resp.<br/>Center</th>
    <th className="border border-black p-1 font-normal" rowSpan={2}>Name of<br/>Payee</th>
    <th className="border border-black p-1 font-normal" rowSpan={2}>Nature of Payment</th>
    <th className="border border-black p-1 font-normal" rowSpan={2}>Amount</th>
    <th className="border border-black p-1 font-normal" rowSpan={2}>Remarks</th>
  </tr>
  <tr className="bg-gray-50 text-center">
    <th className="border border-black p-1 font-normal">Date</th>
    <th className="border border-black p-1 font-normal">No.</th>
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

{t.amount.toLocaleString(undefined,{minimumFractionDigits:2})}

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

{totalAmount.toLocaleString(undefined,{minimumFractionDigits:2})}

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