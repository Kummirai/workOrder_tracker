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
    onAfterPrint: () => {
      window.close();
    },
  });

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

  useEffect(() => {
    if (workOrder) {
      // Small delay to allow content to render properly before printing
      const timer = setTimeout(() => {
        handlePrint();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [workOrder, handlePrint]);

  if (!workOrder) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="font-semibold text-gray-700">Preparing document for printing...</p>
      </div>
    );
  }

  return (
    <main>
      <Invoice ref={componentRef} workOrder={workOrder} />
    </main>
  );
}