import React from 'react';

const SubmittedJobsReport = React.forwardRef(({ workOrders }, ref) => {
  if (!workOrders || workOrders.length === 0) return null;

  const totalAmount = workOrders.reduce((sum, order) => sum + order.jobDetails.cost, 0);
  const totalVat = totalAmount * 0.15;
  const totalAmountWithVat = totalAmount + totalVat;

  return (
    <div ref={ref} className="p-5">
      <h1 className="font-bold mb-5 text-center">Submitted Jobs Report</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Job Number</th>
              <th className="border border-gray-300 p-2">Address</th>
              <th className="border border-gray-300 p-2">Amount (excl. VAT)</th>
              <th className="border border-gray-300 p-2">VAT (15%)</th>
              <th className="border border-gray-300 p-2">Total Amount (incl. VAT)</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((order) => {
              const vat = order.jobDetails.cost * 0.15;
              const total = order.jobDetails.cost + vat;
              return (
                <tr key={order._id}>
                  <td className="border border-gray-300 p-2">{order.jobAddress.jobNumber}</td>
                  <td className="border border-gray-300 p-2">{`${order.jobAddress.streetNumber} ${order.jobAddress.streetName}, ${order.jobAddress.surburb}`}</td>
                  <td className="border border-gray-300 p-2 text-right">R {order.jobDetails.cost.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2 text-right">R {vat.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2 text-right">R {total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td colSpan="2" className="border border-gray-300 p-2 text-right">Total</td>
              <td className="border border-gray-300 p-2 text-right">R {totalAmount.toFixed(2)}</td>
              <td className="border border-gray-300 p-2 text-right">R {totalVat.toFixed(2)}</td>
              <td className="border border-gray-300 p-2 text-right">R {totalAmountWithVat.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
});

SubmittedJobsReport.displayName = 'SubmittedJobsReport';
export default SubmittedJobsReport;