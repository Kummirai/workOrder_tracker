
"use client";

import { useState, useEffect } from "react";
import InputField from "@/components/InputField";
import Template from "@/components/Template";

export default function BoqItems() {
  const [boqItems, setBoqItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBoqItems = async () => {
      const response = await fetch(`/api/boq_items?search=${searchQuery}`);
      const data = await response.json();
      setBoqItems(data);
    };

    const debounceTimeout = setTimeout(() => {
      fetchBoqItems();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <main className="p-5 max-w-6xl mx-auto">
      <h1 className="font-bold mb-5">BOQ Items</h1>
      <div className="mb-5">
        <InputField
          fieldtype={"text"}
          fieldLabel={"Search by Item Number or Description"}
          htmlFor={"boqSearch"}
          placeholder={"Enter search term..."}
          handleChange={(e) => setSearchQuery(e.target.value)}
          inputValue={searchQuery}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 whitespace-nowrap">Item Number</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Description</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Unit</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Quantity Unit</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Rate</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Currency</th>
          </tr>
        </thead>
        <tbody>
          {boqItems.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.itemNumber}</td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.description}</td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.unit}</td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.quantityUnit}</td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.rate}</td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Template />
    </main>
  );
}
