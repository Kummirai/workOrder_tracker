"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function WorkOrderDetailsPage() {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchWorkOrder = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/work_orders/${id}`);
          if (response.ok) {
            const data = await response.json();
            setWorkOrder(data);
          } else {
            setWorkOrder(null);
          }
        } catch (error) {
          setWorkOrder(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchWorkOrder();
    }
  }, [id]);

  const handleMarkAsPaid = async () => {
    const response = await fetch(`/api/work_orders/${id}`, {
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

  const handleUpdateStatus = async (newStatus) => {
    const response = await fetch(`/api/work_orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      setWorkOrder({ ...workOrder, status: newStatus });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this work order?")) {
      const response = await fetch(`/api/work_orders/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/'); // Redirect to home page after deletion
      } else {
        console.error("Failed to delete work order");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="font-semibold text-gray-700">Loading Work Order Details...</p>
      </div>
    );
  }

  if (!workOrder) {
    return <p>Work order not found.</p>;
  }

  const outstandingPayment = (workOrder.jobDetails.cost / 2) * 0.08;

  return (
    <main className="p-5">
      <h1 className="font-bold mb-5">Work Order Details</h1>
      <div className="border p-4 rounded-lg border-gray-300">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="mb-4 md:mb-0">
            <h2 className="font-bold mb-2">{workOrder.jobAddress.jobNumber}</h2>
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
          {workOrder.status !== 'in-progress' && workOrder.status !== 'paid' && (
            <button
              onClick={() => handleUpdateStatus('in-progress')}
              className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-sm cursor-pointer"
            >
              Mark In-Progress
            </button>
          )}
          {workOrder.status !== 'complete' && workOrder.status !== 'paid' && (
            <button
              onClick={() => handleUpdateStatus('complete')}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm cursor-pointer"
            >
              Mark Complete
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm cursor-pointer"
          >
            Delete Work Order
          </button>
        </div>

        <h3 class="font-bold mb-2">Work Items</h3>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2 whitespace-nowrap">Item #</th>
              <th class="border border-gray-300 p-2 whitespace-nowrap">Description</th>
              <th class="border border-gray-300 p-2 whitespace-nowrap">Unit</th>
              <th class="border border-gray-300 p-2 whitespace-nowrap">Quantity</th>
              <th class="border border-gray-300 p-2 whitespace-nowrap">Rate</th>
              <th class="border border-gray-300 p-2 whitespace-nowrap">Cost</th>
            </tr>
          </thead>
          <tbody>
            {workOrder.jobDetails.workItems.map((item, index) => (
              <tr key={index}>
                <td class="border border-gray-300 p-2 whitespace-nowrap">{item.itemNumber && (typeof item.itemNumber === 'object' ? item.itemNumber.$numberInt : item.itemNumber)}</td>
                <td class="border border-gray-300 p-2 whitespace-nowrap">{item.description}</td>
                <td class="border border-gray-300 p-2 whitespace-nowrap">{item.unit}</td>
                <td class="border border-gray-300 p-2 whitespace-nowrap">{item.quantity}</td>
                <td class="border border-gray-300 p-2 whitespace-nowrap">R {item.rate.toFixed(2)}</td>
                <td class="border border-gray-300 p-2 whitespace-nowrap">R {item.cost.toFixed(2)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        {workOrder.jobDetails.materials && workOrder.jobDetails.materials.length > 0 && (
          <>
            <h3 class="font-bold mb-2 mt-4">Materials</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-2 whitespace-nowrap">Material Code</th>
                    <th class="border border-gray-300 p-2 whitespace-nowrap">Description</th>
                    <th class="border border-gray-300 p-2 whitespace-nowrap">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrder.jobDetails.materials.map((material, index) => (
                    <tr key={index}>
                      <td class="border border-gray-300 p-2 whitespace-nowrap">{material.materialCode}</td>
                      <td class="border border-gray-300 p-2 whitespace-nowrap">{material.description}</td>
                      <td class="border border-gray-300 p-2 whitespace-nowrap">{material.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div class="text-right">
          <h4 class="font-bold">Total Cost: R {workOrder.jobDetails.cost.toFixed(2)}</h4>
          {!workOrder.paid && (
            <p class="font-semibold text-red-600">Outstanding: R {outstandingPayment.toFixed(2)}</p>
          )}
        </div>
        {!workOrder.paid && (
          <div class="flex justify-end mt-4">
            <button
              onClick={handleMarkAsPaid}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer"
            >
              Mark as Paid
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
