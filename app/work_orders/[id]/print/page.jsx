"use client";

import { useEffect, useState } from 'react';
import PrintableWorkOrder from '@/components/PrintableWorkOrder';

export default function PrintPage({ params }) {
  const [workOrder, setWorkOrder] = useState(null);

  useEffect(() => {
    const fetchWorkOrder = async () => {
      const response = await fetch(`/api/work_orders/${params.id}`);
      const data = await response.json();
      setWorkOrder(data);
    };
    fetchWorkOrder();
  }, [params.id]);

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
