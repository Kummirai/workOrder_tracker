import React from 'react';

const PrintableWorkOrder = React.forwardRef(({ workOrder }, ref) => {
  if (!workOrder) return null;

  return (
    <div ref={ref} className="p-5">
      <h1 className="text-2xl font-bold mb-5">Work Order: {workOrder.jobAddress.jobNumber}</h1>
      <address className="not-italic mb-4">
        {workOrder.jobAddress.streetNumber} {workOrder.jobAddress.streetName}, {workOrder.jobAddress.surburb}<br />
        {workOrder.jobAddress.city}
      </address>
      <p className="mb-4"><strong>Date:</strong> {workOrder.date}</p>
      
      <h3 className="text-lg font-bold mb-2">Work Items</h3>
      <div className="overflow-x-auto"> {/* Added overflow-x-auto */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Item #</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Unit</th>
              <th className="border border-gray-300 p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {workOrder.jobDetails.workItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{item.itemNumber && (typeof item.itemNumber === 'object' ? item.itemNumber.$numberInt : item.itemNumber)}</td>
                <td className="border border-gray-300 p-2">{item.description}</td>
                <td className="border border-gray-300 p-2">{item.unit}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {workOrder.jobDetails.materials && workOrder.jobDetails.materials.length > 0 && (
        <>
            <h3 className="text-lg font-bold mb-2 mt-4">Materials</h3>
            <div className="overflow-x-auto"> {/* Added overflow-x-auto */}
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Material Code</th>
                        <th className="border border-gray-300 p-2">Description</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {workOrder.jobDetails.materials.map((material, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{material.materialCode}</td>
                            <td className="border border-gray-300 p-2">{material.description}</td>
                            <td className="border border-gray-300 p-2">{material.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
      )}
    </div>
  );
});

PrintableWorkOrder.displayName = 'PrintableWorkOrder';
export default PrintableWorkOrder;