"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WorkOrderDetailsPage({ params }) {
  const [workOrder, setWorkOrder] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const fetchWorkOrder = async () => {
        const response = await fetch(`/api/work_orders/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setWorkOrder(data);
        }
      };
      fetchWorkOrder();
    }
  }, [params.id]);

  const handleMarkAsPaid = async () => {
    const response = await fetch(`/api/work_orders/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paid: true, status: 'paid' }),
    });

    if (response.ok) {
      setWorkOrder({ ...workOrder, paid: true, status: 'paid' });
      router.push('/');
    }
  };

  if (!workOrder) {
    return <p>Work order not found.</p>;
  }

  const outstandingPayment = (workOrder.jobDetails.cost / 2) * 0.08;

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-5">Work Order Details</h1>
      <div className="border p-4 rounded-lg border-gray-300">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">{workOrder.jobAddress.jobNumber}</h2>
            <address className="not-italic mb-4">
              {workOrder.jobAddress.streetNumber} {workOrder.jobAddress.streetName}, {workOrder.jobAddress.surburb}<br />
              {workOrder.jobAddress.city}
            </address>
          </div>
          <div>
            {workOrder.paid ? (
              <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">Paid</span>
            ) : (
              <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">Unpaid</span>
            )}
          </div>
        </div>
        <p className="mb-4"><strong>Date:</strong> {workOrder.date}</p>
        <p className="mb-4"><strong>Status:</strong> {workOrder.status}</p>

        <h3 className="text-lg font-bold mb-2">Work Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 whitespace-nowrap">Item #</th>
              <th className="border border-gray-300 p-2 whitespace-nowrap">Description</th>
              <th className="border border-gray-300 p-2 whitespace-nowrap">Unit</th>
              <th className="border border-gray-300 p-2 whitespace-nowrap">Quantity</th>
              <th className="border border-gray-300 p-2 whitespace-nowrap">Rate</th>
              <th className="border border-gray-300 p-2 whitespace-nowrap">Cost</th>
            </tr>
          </thead>
          <tbody>
            {workOrder.jobDetails.workItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 whitespace-nowrap">{item.itemNumber && (typeof item.itemNumber === 'object' ? item.itemNumber.$numberInt : item.itemNumber)}</td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">{item.description}</td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">{item.unit}</td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">{item.quantity}</td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">R {item.rate.toFixed(2)}</td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">R {item.cost.toFixed(2)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>        <div className="text-right">
          <h4 className="text-xl font-bold">Total Cost: R {workOrder.jobDetails.cost.toFixed(2)}</h4>
          {!workOrder.paid && (
            <p className="text-lg font-semibold text-red-600">Outstanding: R {outstandingPayment.toFixed(2)}</p>
          )}
        </div>
        {!workOrder.paid && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleMarkAsPaid}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Mark as Paid
            </button>
          </div>
        )}
      </div>
    </main>
  );
}