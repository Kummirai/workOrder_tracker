const Invoice = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg">
      {/* Header Section with Logo */}
      <div className="grid grid-cols-3 gap-8 mb-8 items-start">
        {/* Logo Section */}
        <div className="flex items-center justify-start">
          <div className="w-32 h-32 bg-gray-200 border border-gray-300 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Company Logo" 
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden text-center text-gray-500 text-sm">
              Company Logo
            </div>
          </div>
        </div>
        
        {/* Company Details */}
        <div>
          <div className="mb-4">
            <div className="text-sm text-gray-600">Reg No</div>
            <div className="font-semibold">2002/098222/23</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-600">Vat Reg</div>
            <div className="font-semibold">4800225080</div>
          </div>
        </div>
        
        {/* Invoice Details */}
        <div className="text-right">
          <div className="text-xl font-bold mb-2">TAX INVOICE</div>
          <div className="mb-2">
            <div className="text-sm text-gray-600">DATE</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Tax Invoice no:</div>
            <div className="font-semibold">TLCP/</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">Cell no:</span>
            <span className="ml-2">082 9272 945 (Mike Sanders)</span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">Tel no:</span>
            <span className="ml-2">012 644 0874</span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">Fax no:</span>
            <span className="ml-2">(012) 377-1513</span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">E-mail address:</span>
            <span className="ml-2">tlopocons@gmail.com</span>
          </div>
          
          <div className="mt-4">
            <div>Shop no:06</div>
            <div>48 Botha Avenue</div>
            <div>Lyttelton</div>
          </div>
        </div>
        
        <div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">Cell no:</span>
            <span className="ml-2">071 318 4854 (Prince Ramano)</span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">Tel no:</span>
            <span className="ml-2">086 667 9557</span>
          </div>
          
          <div className="mt-4 mb-2">
            <div className="font-semibold">City Power Johannesburg</div>
            <div className="text-sm text-gray-600">Vat Reg : 4710191182</div>
          </div>
          
          <div className="mt-4">
            <div className="text-sm text-gray-600">P.O Box 17</div>
            <div>GARSFONTEIN</div>
            <div>0042</div>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mb-8">
        <div className="text-sm text-gray-600">Deliver to</div>
        <div className="font-semibold">City Power Johannesburg</div>
        <div>Alex Depot</div>
      </div>

      {/* Job Details */}
      <div className="mb-8 space-y-2">
        <div>
          <span className="text-sm text-gray-600">JOB Number:</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">PO Number:</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Reference GRN:</span>
        </div>
      </div>

      {/* Project Info */}
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-1">(6 Officers x 7 months)</div>
        <div className="font-semibold">PROJECT: STREETLIGHT ALEX (melvill hyle penk)</div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2 px-4 font-semibold">Code</th>
              <th className="text-left py-2 px-4 font-semibold">Description</th>
              <th className="text-left py-2 px-4 font-semibold">Quantity</th>
              <th className="text-left py-2 px-4 font-semibold">Unit Price</th>
              <th className="text-left py-2 px-4 font-semibold">Tax</th>
              <th className="text-left py-2 px-4 font-semibold">Net Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4">221</td>
              <td className="py-3 px-4">Wire any Pole Size</td>
              <td className="py-3 px-4">1</td>
              <td className="py-3 px-4">191.67</td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4">191.67</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4">0</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-md ml-auto">
        <div className="col-span-2 text-right font-semibold">Sub Total:</div>
        <div></div>
        
        <div className="col-span-2 text-right">Amount excluding Tax</div>
        <div>0</div>
        
        <div className="col-span-2 text-right">Tax</div>
        <div>0.15</div>
        
        <div className="col-span-2 text-right font-semibold">Total</div>
        <div className="font-semibold">0</div>
      </div>

      {/* Banking Details */}
      <div className="border-t-2 border-gray-300 pt-6">
        <div className="font-bold text-lg mb-4">BANKING DETAILS</div>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Bank Name:</span>
            <span className="ml-2">First National Bank</span>
          </div>
          <div>
            <span className="font-semibold">Acc holder:</span>
            <span className="ml-2">Tlopo Construction and General Services</span>
          </div>
          <div>
            <span className="font-semibold">Acc no:</span>
            <span className="ml-2">62103590007</span>
          </div>
          <div>
            <span className="font-semibold">Type of Acc:</span>
            <span className="ml-2">Cheque</span>
          </div>
          <div>
            <span className="font-semibold">Branch Name:</span>
            <span className="ml-2">Menlyn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;