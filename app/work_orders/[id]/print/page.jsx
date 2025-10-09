"use client";

import { useEffect, useState } from 'react';
import PrintableWorkOrder from '@/components/PrintableWorkOrder';
import { useParams } from 'next/navigation';

export default function PrintPage() {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState(null);

  useEffect(() => {
    const fetchWorkOrder = async () => {
      const response = await fetch(`/api/work_orders/${id}`);
      const data = await response.json();
      setWorkOrder(data);
    };
    fetchWorkOrder();
  }, [id]);

  useEffect(() => {
    if (workOrder) {
      window.print();
    }
  }, [workOrder]);

  if (!workOrder) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="font-semibold text-gray-700">Preparing Work Order for Print...</p>
      </div>
    );
  }

  return <PrintableWorkOrder workOrder={workOrder} />;
}
