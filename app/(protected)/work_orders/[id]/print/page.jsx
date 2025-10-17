"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Invoice from "@/components/Template.jsx";

export default function PrintPage() {
  const { id } = useParams();
  const router = useRouter();
  const [workOrder, setWorkOrder] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchWorkOrder = async () => {
        const response = await fetch(`/api/work_orders/${id}`);
        if (response.ok) {
          const data = await response.json();
          setWorkOrder(data);
        }
      };
      fetchWorkOrder();
    }
  }, [id]);

  if (!workOrder) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="font-semibold text-gray-700">Loading Invoice...</p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @page {
          size: A4;
          margin: 0mm 5mm; /* 0mm top/bottom, 5mm left/right */
        }
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container,
          .print-container * {
            visibility: visible;
          }
          .print-container {
            /* The visibility text-sm md:mt-24 rules are sufficient to isolate the component */
          }
          .print-container .invoice-for-print {
            font-size: 11px; /* All text 11px */
            max-width: 100% !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            padding-top: 5mm; /* Add top padding to the invoice content */
          }
          .print-container .invoice-for-print h1,
          .print-container .invoice-for-print h2,
          .print-container .invoice-for-print h3,
          .print-container .invoice-for-print h4 {
            font-size: 14px; /* Headings 14px */
          }
          .print-container .invoice-for-print table {
            font-size: 12px; /* Table text 12px (original visual size) */
          }
          .print-container .invoice-for-print table th,
          .print-container .invoice-for-print table td {
            padding: 4px;
            white-space: normal !important;
            word-break: break-word;
          }
          .print-container .invoice-for-print .banking-details-content {
            font-size: 9pt; /* Banking details content 9pt */
          }
          .print-container .invoice-for-print .banking-details-container {
            page-break-inside: avoid; /* Prevent banking details from splitting */
          }
          .print-container .invoice-for-print .print-tight-spacing {
            margin-bottom: 0.5rem !important; /* Reduce bottom margin */
            padding-bottom: 0.5rem !important; /* Reduce bottom padding */
            margin-top: 0.5rem !important; /* Reduce top margin */
            padding-top: 0.5rem !important; /* Reduce top padding */
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
      <main className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto mb-8 text-center no-print">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Print Preview
          </h1>
          <p className="text-gray-600">
            Click the button below to print the invoice.
          </p>
          <button
            onClick={() => window.print()}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer font-semibold"
          >
            Print Invoice
          </button>
          <button
            onClick={() => router.back()}
            className="mt-4 ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 cursor-pointer font-semibold"
          >
            Back
          </button>
        </div>
        <div className="max-w-4xl mx-auto bg-white shadow-lg print-container">
          <Invoice workOrder={workOrder} className="invoice-for-print" />
        </div>
      </main>
    </>
  );
}
