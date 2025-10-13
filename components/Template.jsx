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

      {/* Items Table with Totals */}
      <div className="mb-8 border border-gray-300">
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
            {/* Empty rows for items */}
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

            {/* Totals Section as part of the table */}
            <tr className="border-t-2 border-gray-300 bg-gray-50">
              <td
                colSpan={5}
                className="py-3 px-4 text-right font-semibold border-r border-gray-300"
              >
                Sub Total:
              </td>
              <td className="py-3 px-4 font-semibold"></td>
            </tr>
            <tr className="bg-gray-50">
              <td
                colSpan={5}
                className="py-2 px-4 text-right border-r border-gray-300"
              >
                Amount excluding Tax
              </td>
              <td className="py-2 px-4 font-semibold">R 0,00</td>
            </tr>
            <tr className="bg-gray-50">
              <td
                colSpan={5}
                className="py-2 px-4 text-right border-r border-gray-300"
              >
                Tax 15%
              </td>
              <td className="py-2 px-4"></td>
            </tr>
            <tr className="border-t-2 border-gray-300 bg-gray-50">
              <td
                colSpan={5}
                className="py-3 px-4 text-right font-semibold border-r border-gray-300"
              >
                Total
              </td>
              <td className="py-3 px-4 font-semibold">R 0,00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer with Banking Details */}
      <div className="border-t border-gray-300 pt-6">
        <div className="font-bold text-lg mb-4 text-center">
          BANKING DETAILS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm text-center">
          <div>
            <div className="font-semibold">Bank Name:</div>
            <div>First National Bank</div>
          </div>
          <div>
            <div className="font-semibold">Acc holder:</div>
            <div>Tippo Construction and General Services</div>
          </div>
          <div>
            <div className="font-semibold">Acc no:</div>
            <div>62103590007</div>
          </div>
          <div>
            <div className="font-semibold">Type of Acc:</div>
            <div>Cheque</div>
          </div>
          <div>
            <div className="font-semibold">Branch Name:</div>
            <div>Menlyn</div>
          </div>
        </div>
      </div>

      {/* Thank You Footer */}
      <div className="mt-6 text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
        Thank you for your business
      </div>
    </div>
  );
};

export default Invoice;
