'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Invoice from '@/components/Template.jsx';

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

  return (
    <main className="p-5">
      <h1 className="font-bold mb-5">Work Order Details</h1>
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
          {!workOrder.paid && (
            <button
              onClick={handleMarkAsPaid}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer"
            >
              Mark as Paid
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm cursor-pointer"
          >
            Delete Work Order
          </button>
        </div>
      <Invoice workOrder={workOrder} />
    </main>
  );
}