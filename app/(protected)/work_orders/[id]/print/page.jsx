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
          margin: 10mm;
        }
        @media print {
          main {
            min-height: initial !important;
          }
          body {
            font-size: 12px;
          }
          body * {
            visibility: hidden;
          }
          .print-container,
          .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none;
          }
          .print-container table {
            font-size: 11px;
          }
          .print-container th, .print-container td {
            padding: 4px !important;
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
