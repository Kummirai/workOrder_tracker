'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import SubmittedJobsReport from '@/components/SubmittedJobsReport';

export default function PrintSubmittedJobsPage() {
  const router = useRouter();
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const componentRef = useRef();

  const pageStyle = `
    @page {
      size: A4;
      margin: 20mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
    }
  `;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
    onAfterPrint: () => {
      router.back();
    },
  });

  useEffect(() => {
    const fetchSubmittedWorkOrders = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/work_orders?status=submitted`);
      if (response.ok) {
        const data = await response.json();
        setSubmittedOrders(data);
      }
      setIsLoading(false);
    };
    fetchSubmittedWorkOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="font-semibold text-gray-700">Loading Report...</p>
      </div>
    );
  }

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Print Preview</h1>
        <p className="text-gray-600">Click the button below to print the report of submitted jobs.</p>
        <button
          onClick={handlePrint}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer font-semibold"
        >
          Print Report
        </button>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        <SubmittedJobsReport ref={componentRef} workOrders={submittedOrders} />
      </div>
    </main>
  );
}