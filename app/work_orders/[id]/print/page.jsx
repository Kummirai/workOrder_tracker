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
    return <p>Loading for print...</p>;
  }

  return <PrintableWorkOrder workOrder={workOrder} />;
}
