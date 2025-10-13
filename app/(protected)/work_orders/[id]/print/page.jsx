'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import Invoice from '@/components/Template.jsx';

export default function PrintPage() {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState(null);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const fetchWorkOrder = async () => {
      const response = await fetch(`/api/work_orders/${id}`);
      const data = await response.json();
      setWorkOrder(data);
    };
    fetchWorkOrder();
  }, [id]);

  return (
    <main className="p-5">
      <div className="mb-4">
        <button
          onClick={handlePrint}
          disabled={!workOrder}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer disabled:bg-gray-400"
        >
          Print
        </button>
      </div>
      {/* The Invoice component will return null if workOrder is not ready */}
      <Invoice ref={componentRef} workOrder={workOrder} />
    </main>
  );
}
