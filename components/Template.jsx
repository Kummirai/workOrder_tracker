import React from "react";
import { format } from "date-fns";

const Invoice = React.forwardRef(({ workOrder, className }, ref) => {
  if (!workOrder) {
    return null;
  }

  const subTotal = workOrder.jobDetails.cost;
  const tax = subTotal * 0.15;
  const total = subTotal + tax;
  const displayDate =
    workOrder.date && !isNaN(new Date(workOrder.date))
      ? format(new Date(workOrder.date), "dd MMM yyyy")
      : "";

  return (
    <div ref={ref} className={`p-4 ${className || ""}`}>
      <h1 className="text-xl font-bold mb-4">Work Order Details</h1>

      <div className="mb-4">
        <p><strong>Job Number:</strong> {workOrder.jobAddress.jobNumber}</p>
        <p><strong>Date:</strong> {displayDate}</p>
        <p><strong>Address:</strong> {workOrder.jobAddress.streetNumber} {workOrder.jobAddress.streetName}, {workOrder.jobAddress.surburb}, {workOrder.jobAddress.city}</p>
      </div>

      <h2 className="text-lg font-semibold mb-2">Work Items</h2>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Code</th>
              <th className="border border-gray-300 p-2 text-left">Description</th>
              <th className="border border-gray-300 p-2 text-right">Quantity</th>
              <th className="border border-gray-300 p-2 text-right">Unit Price</th>
              <th className="border border-gray-300 p-2 text-right">Net Price</th>
            </tr>
          </thead>
          <tbody>
            {workOrder.jobDetails.workItems
              .slice()
              .sort((a, b) => {
                const itemA = String(a.itemNumber);
                const itemB = String(b.itemNumber);
                return itemA.localeCompare(itemB, undefined, {
                  numeric: true,
                  sensitivity: "base",
                });
              })
              .map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="border border-gray-300 p-2">{item.itemNumber}</td>
                  <td className="border border-gray-300 p-2">{item.description}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.quantity}</td>
                  <td className="border border-gray-300 p-2 text-right">R {item.rate.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2 text-right">R {item.cost.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {workOrder.jobDetails.materials && workOrder.jobDetails.materials.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2">Materials</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Material Code</th>
                  <th className="border border-gray-300 p-2 text-left">Description</th>
                  <th className="border border-gray-300 p-2 text-right">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {workOrder.jobDetails.materials.map((material, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="border border-gray-300 p-2">{material.materialCode}</td>
                    <td className="border border-gray-300 p-2">{material.description}</td>
                    <td className="border border-gray-300 p-2 text-right">{material.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="text-right mt-4">
        <p><strong>Sub Total:</strong> R {subTotal.toFixed(2)}</p>
        <p><strong>Tax (15%):</strong> R {tax.toFixed(2)}</p>
        <p className="text-xl font-bold"><strong>Total:</strong> R {total.toFixed(2)}</p>
      </div>
    </div>
  );
});

Invoice.displayName = "Invoice";

export default Invoice;
