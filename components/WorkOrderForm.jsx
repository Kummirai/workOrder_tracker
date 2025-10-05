"use client";

import InputField from "@/components/InputField";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const WorkOrderForm = ({ workOrderToEdit }) => {
  const router = useRouter();
  const [jobNumber, setJobNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [surburb, setSurburb] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("new");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  
  const [boqItems, setBoqItems] = useState([]);
  const [selectedBoqItem, setSelectedBoqItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const [workItems, setWorkItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchBoqItems = async () => {
      const response = await fetch("/api/boq_items");
      const data = await response.json();
      setBoqItems(data);
    };
    fetchBoqItems();
  }, []);

  useEffect(() => {
    if (workOrderToEdit) {
      setJobNumber(workOrderToEdit.jobAddress.jobNumber);
      setStreetName(workOrderToEdit.jobAddress.streetName);
      setStreetNumber(workOrderToEdit.jobAddress.streetNumber);
      setSurburb(workOrderToEdit.jobAddress.surburb);
      setCity(workOrderToEdit.jobAddress.city);
      setStatus(workOrderToEdit.status);
      setDate(workOrderToEdit.date);
      setWorkItems(workOrderToEdit.jobDetails.workItems);
    }
  }, [workOrderToEdit]);

  useEffect(() => {
    const newTotalCost = workItems.reduce((sum, item) => sum + item.cost, 0);
    setTotalCost(newTotalCost);
  }, [workItems]);

  const handleAddItem = () => {
    if (!selectedBoqItem || quantity <= 0) {
      return;
    }
    const selectedItem = boqItems.find((item) => item._id === selectedBoqItem);
    if (selectedItem) {
      const newItem = {
        boqId: selectedItem._id,
        description: selectedItem.description,
        unit: selectedItem.unit,
        rate: selectedItem.rate,
        quantity: parseFloat(quantity),
        cost: selectedItem.rate * parseFloat(quantity),
      };
      setWorkItems([...workItems, newItem]);
      setSelectedBoqItem("");
      setQuantity(1);
    }
  };

  const handleRemoveItem = (index) => {
    const newWorkItems = [...workItems];
    newWorkItems.splice(index, 1);
    setWorkItems(newWorkItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workOrder = {
      jobAddress: {
        jobNumber,
        streetName,
        streetNumber,
        surburb,
        city,
      },
      jobDetails: {
        workItems: workItems,
        cost: totalCost,
      },
      status: status,
      date: date,
    };

    const url = workOrderToEdit
      ? `/api/work_orders/${workOrderToEdit._id}`
      : "/api/work_orders";
    const method = workOrderToEdit ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workOrder }),
    });

    if (response.ok) {
      if (workOrderToEdit) {
        router.push(`/work_orders/${workOrderToEdit._id}`);
      } else {
        setJobNumber("");
        setStreetName("");
        setStreetNumber("");
        setSurburb("");
        setCity("");
        setWorkItems([]);
        setSelectedBoqItem("");
        setQuantity(1);
      }
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl border p-4 rounded-lg border-gray-300 col-start-1 col-end-2"
    >
      <div className="border border-gray-200 p-4 rounded-s mt-4">
        {/* Address Fields */}
        <InputField
          fieldtype={"text"}
          fieldLabel={"Job Number"}
          htmlFor={"jobNumber"}
          placeholder={"Enter Job Number"}
          handleChange={(e) => setJobNumber(e.target.value)}
          inputValue={jobNumber}
        />
        <InputField
          fieldtype={"text"}
          fieldLabel={"Street Number"}
          htmlFor={"streetNumber"}
          placeholder={"Enter Street Number"}
          handleChange={(e) => setStreetNumber(e.target.value)}
          inputValue={streetNumber}
        />
        <InputField
          fieldtype={"text"}
          fieldLabel={"Street Name"}
          htmlFor={"streetName"}
          placeholder={"Enter Street Name"}
          handleChange={(e) => setStreetName(e.target.value)}
          inputValue={streetName}
        />
        <InputField
          fieldtype={"text"}
          fieldLabel={"Surburb"}
          htmlFor={"surburb"}
          placeholder={"Enter Surburb"}
          handleChange={(e) => setSurburb(e.target.value)}
          inputValue={surburb}
        />
        <InputField
          fieldtype={"text"}
          fieldLabel={"City"}
          htmlFor={"city"}
          placeholder={"Enter City"}
          handleChange={(e) => setCity(e.target.value)}
          inputValue={city}
        />
      </div>

      {/* Item Selection */}
      <div className="border border-gray-300 p-3 rounded-s mt-4">
        <select
          className="border w-[100%] mt-1 rounded-s outline-blue-200 border-gray-200 p-1 text-[0.85rem]"
          onChange={(e) => setSelectedBoqItem(e.target.value)}
          value={selectedBoqItem}
        >
          <option value="">Select Work Done</option>
          {boqItems.map((item) => (
            <option key={item._id} value={item._id}>
              {item.description}
            </option>
          ))}
        </select>
        <InputField
          fieldtype={"number"}
          fieldLabel={"Quantity"}
          htmlFor={"quantity"}
          placeholder={"Quantity"}
          handleChange={(e) => setQuantity(e.target.value)}
          inputValue={quantity}
        />
        <div className="text-white mt-4">
          <button
            type="button"
            onClick={handleAddItem}
            className="rounded-md bg-blue-800 px-3 py-1"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Added Items List */}
      <div className="border border-gray-300 p-3 rounded-s mt-4">
        <h3 className="text-lg font-bold mb-2">Work Items</h3>
        {workItems.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Description</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Rate</th>
                <th className="text-right">Cost</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {workItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{item.rate.toFixed(2)}</td>
                  <td className="text-right">{item.cost.toFixed(2)}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-4 text-right">
          <h4 className="text-xl font-bold">Total Cost: R{totalCost.toFixed(2)}</h4>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-white mt-4 flex items-center justify-end">
        <button type="submit" className="rounded-md bg-blue-800 px-3 py-1">
          {workOrderToEdit ? "Update Job" : "Submit Job"}
        </button>
      </div>
    </form>
  );
};

export default WorkOrderForm;
