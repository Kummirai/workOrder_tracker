const Invoice = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300">
      {/* Header Section */}
      <div className="grid grid-cols-2 gap-8 mb-6 border-b border-gray-300 pb-4">
        {/* Left Column - Company Details */}
        <div>
          <div className="flex items-center mb-4">
            {/* Logo Placeholder */}
            <div className="w-16 h-16 bg-gray-100 border border-gray-300 mr-4 flex items-center justify-center">
              <span className="text-xs text-gray-500 text-center">LOGO</span>
            </div>
            <div>
              <div className="font-bold text-lg">TLOPO</div>
              <div className="text-sm font-semibold">
                CONSTRUCTION & GENERAL SERVICES
              </div>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <div>
              <span className="font-semibold">Reg No</span>
              <span className="ml-2">2002/098222/23</span>
            </div>
            <div>
              <span className="font-semibold">Val Reg</span>
              <span className="ml-2">4800225080</span>
            </div>
          </div>
        </div>

        {/* Right Column - Invoice Details */}
        <div className="text-right border border-gray-300 p-3">
          <div className="font-bold text-xl mb-2">TAX INVOICE</div>
          <div className="mb-2">
            <div className="font-semibold">DATE</div>
          </div>
          <div>
            <div className="font-semibold">Tax Invoice no: TLCP/</div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="grid grid-cols-2 gap-8 mb-6 border-b border-gray-300 pb-4">
        {/* Left Column - Sender */}
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold">Cell no:</span>
            <span className="ml-2">071 318 4854 (Prince Ramano)</span>
          </div>
          <div>
            <span className="font-semibold">Tel no:</span>
            <span className="ml-2">012 644 0874</span>
          </div>
          <div>
            <span className="font-semibold">Fax no:</span>
            <span className="ml-2">(086 667 9557)</span>
          </div>
          <div>
            <span className="font-semibold">E-mail address:</span>
            <span className="ml-2">liopocons@gmail.com</span>
          </div>

          <div className="mt-4">
            <div>Shop no:06</div>
            <div>48 Bofna Avenue</div>
            <div>Lytleton</div>
          </div>
        </div>

        {/* Right Column - Receiver */}
        <div className="space-y-2 text-sm">
          <div className="font-semibold">City Power Johannesburg</div>
          <div className="text-sm">
            <span className="font-semibold">Val Reg :</span>
            <span className="ml-2">4710191182</span>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold">P.O Box 17</div>
            <div>GARSFONTEN</div>
            <div>0042</div>
          </div>

          {/* Deliver To Section */}
          <div className="mt-4 border border-gray-300 p-2">
            <div className="font-semibold text-sm">Deliver to</div>
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
          </div>
          <div>
            <span className="font-semibold">PO Number:</span>
          </div>
          <div>
            <span className="font-semibold">Reference GRN:</span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6 border border-gray-300">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-50">
              <th className="text-left py-2 px-4 font-semibold border-r border-gray-300">
                Code
              </th>
              <th className="text-left py-2 px-4 font-semibold border-r border-gray-300">
                Description
              </th>
              <th className="text-left py-2 px-4 font-semibold border-r border-gray-300">
                Quantity
              </th>
              <th className="text-left py-2 px-4 font-semibold border-r border-gray-300">
                Unit Price
              </th>
              <th className="text-left py-2 px-4 font-semibold border-r border-gray-300">
                Tax
              </th>
              <th className="text-left py-2 px-4 font-semibold">Net Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4"></td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4"></td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totals and Banking Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Banking Details */}
        <div className="border border-gray-300 p-4">
          <div className="font-bold text-lg mb-3 border-b border-gray-300 pb-2">
            BANKING DETAILS
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Bank Name:</span>
              <span className="ml-2">First National Bank</span>
            </div>
            <div>
              <span className="font-semibold">Acc holder:</span>
              <span className="ml-2">
                Tippo Construction and General Services
              </span>
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

        {/* Totals Section */}
        <div className="border border-gray-300 p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Sub Total:</span>
              <span></span>
            </div>
            <div className="flex justify-between">
              <span>Amount excluding Tax</span>
              <span className="font-semibold">R 0,00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax 15%</span>
              <span></span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">R 0,00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
        Thank you for your business
      </div>
    </div>
  );
};

export default Invoice;
