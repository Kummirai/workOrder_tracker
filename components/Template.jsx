import React from 'react';
import { format } from 'date-fns';

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
    <div ref={ref} className={`max-w-6xl mx-auto p-4 md:p-6 bg-white border border-gray-300 ${className || ''}`}>
      {/* Header Section */}
      <div className="grid grid-cols-2 gap-8 mb-6 border-b border-gray-300 pb-4">
        {/* Left Column - Company Details */}
        <div className="flex items-start justify-between">
          <img
            src="/Picture1.png"
            alt="TLOPO Construction Logo"
            className="w-40 h-auto object-contain"
          />
          <div className="text-sm text-right">
            <div>
              <span className="font-semibold">Reg No</span>
              <span className="ml-2">2002/098222/23</span>
            </div>
            <div>
              <span className="font-semibold">Vat Reg</span>
              <span className="ml-2">4800225080</span>
            </div>
          </div>
        </div>

        {/* Right Column - Invoice Details */}
        <div className="text-left md:text-right border border-gray-300 p-3">
          <div className="font-bold text-xl mb-2">TAX INVOICE</div>
          <div className="mb-2">
            <div className="font-semibold">{displayDate}</div>
          </div>
          <div>
            <div className="font-semibold">Tax Invoice no: TLCP/{workOrder.jobAddress.jobNumber}</div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="grid grid-cols-2 gap-8 mb-6 border-b border-gray-300 pb-4 items-start">
        {/* Left Column - Sender */}
        <div className="text-sm">
          <div className="grid grid-cols-[max-content_1fr] gap-x-2">
            <span className="font-semibold">Cell no:</span>
            <span>071 318 4854 (Prince Ramano)</span>
            
            <span className="font-semibold">Tel no:</span>
            <span>012 644 0874</span>

            <span className="font-semibold">Fax no:</span>
            <span>(086 667 9557)</span>

            <span className="font-semibold">E-mail address:</span>
            <span>tlopocons@gmail.com</span>
          </div>

          <div className="mt-4">
            <div>Shop no:06</div>
            <div>48 Botha Avenue</div>
            <div>Lyttelton</div>
          </div>
        </div>

        {/* Right Column - Receiver */}
        <div className="text-sm">
          <div className="font-semibold">City Power Johannesburg</div>
          <div>
            <span className="font-semibold">Vat Reg :</span>
            <span className="ml-2">4710191182</span>
          </div>

          <div className="mt-8">
            <div className="font-semibold">P.O Box 17</div>
            <div>GARSFONTEN</div>
            <div>0042</div>
          </div>

          {/* Deliver To Section */}
          <div className="mt-8 border border-gray-300 p-2">
            <div className="font-semibold">Deliver to</div>
            <div className="font-semibold">City Power Johannesburg</div>
            <div>Alex Depot</div>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="mb-4 border-b border-gray-300 pb-4">
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold">JOB Number:</span>
            <span className="ml-2">{workOrder.jobAddress.jobNumber}</span>
          </div>
          <div>
            <span className="font-semibold">PO Number:</span>
          </div>
          <div>
            <span className="font-semibold">Reference GRN:</span>
          </div>
        </div>
      </div>

      {/* Items Table with Totals */}
      <div className="mb-8 border border-gray-300 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '44%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-300 bg-gray-50">
              <th className="text-left py-2 px-4 font-semibold border-r border-gray-300">Code</th>
              <th className="text-left py-2 px-4 font-semibold border-r border-gray-300">Description</th>
              <th className="text-right py-2 px-4 font-semibold border-r border-gray-300">Quantity</th>
              <th className="text-right py-2 px-4 font-semibold border-r border-gray-300">Unit Price</th>
              <th className="text-right py-2 px-4 font-semibold border-r border-gray-300">Tax</th>
              <th className="text-right py-2 px-4 font-semibold">Net Price</th>
            </tr>
          </thead>
          <tbody>
            {workOrder.jobDetails.workItems
              .slice()
              .sort((a, b) => {
                const itemA = String(a.itemNumber);
                const itemB = String(b.itemNumber);
                return itemA.localeCompare(itemB, undefined, { numeric: true, sensitivity: 'base' });
              })
              .map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-1 px-4 border-r border-gray-300">{item.itemNumber}</td>
                <td className="py-1 px-4 border-r border-gray-300">{item.description}</td>
                <td className="py-1 px-4 text-right border-r border-gray-300">{item.quantity}</td>
                <td className="py-1 px-4 text-right border-r border-gray-300">R {item.rate.toFixed(2)}</td>
                <td className="py-1 px-4 text-right border-r border-gray-300">R {(item.cost * 0.15).toFixed(2)}</td>
                <td className="py-1 px-4 text-right">R {item.cost.toFixed(2)}</td>
              </tr>
            ))}

            {/* Totals Section as part of the table */}
            <tr className="border-t-2 border-gray-300 bg-gray-50">
              <td colSpan="4" className="py-1 px-4"></td>
              <td className="py-1 px-4 text-right font-semibold border-r border-gray-300">Sub Total:</td>
              <td className="py-1 px-4 text-right font-semibold">R {subTotal.toFixed(2)}</td>
            </tr>
            <tr className="bg-gray-50">
              <td colSpan="4" className="py-1 px-4"></td>
              <td className="py-1 px-4 text-right border-r border-gray-300">Amount excluding Tax</td>
              <td className="py-1 px-4 text-right font-semibold">R {subTotal.toFixed(2)}</td>
            </tr>
            <tr className="bg-gray-50">
              <td colSpan="4" className="py-1 px-4"></td>
              <td className="py-1 px-4 text-right border-r border-gray-300">Tax 15%</td>
              <td className="py-1 px-4 text-right">R {tax.toFixed(2)}</td>
            </tr>
            <tr className="border-t-2 border-gray-300 bg-gray-50">
              <td colSpan="4" className="py-1 px-4"></td>
              <td className="py-1 px-4 text-right font-semibold border-r border-gray-300">Total</td>
              <td className="py-1 px-4 text-right font-semibold">R {total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer with Banking Details */}
      <div className="border-t border-gray-300 pt-6">
        <div className="font-bold text-lg mb-4 text-start">BANKING DETAILS</div>
        <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm text-start">
          <div className="font-semibold">Bank Name:</div>
          <div>First National Bank</div>
          
          <div className="font-semibold">Acc holder:</div>
          <div>Tlopo Construction and General Services</div>
          
          <div className="font-semibold">Acc no:</div>
          <div>62103590007</div>
          
          <div className="font-semibold">Type of Acc:</div>
          <div>Cheque</div>
          
          <div className="font-semibold">Branch Name:</div>
          <div>Menlyn</div>
        </div>
      </div>

      {/* Thank You Footer */}
      <div className="mt-6 text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
        Thank you for your business
      </div>
    </div>
  );
});

Invoice.displayName = 'Invoice';

export default Invoice;