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
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  
  const [boqItems, setBoqItems] = useState([]);
  const [selectedBoqItem, setSelectedBoqItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const [workItems, setWorkItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const [materials, setMaterials] = useState([]);
  const [materialCode, setMaterialCode] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [materialQuantity, setMaterialQuantity] = useState(1);

  const [boqSearchQuery, setBoqSearchQuery] = useState("");
  const [filteredBoqItems, setFilteredBoqItems] = useState([]);

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
      setDate(workOrderToEdit.date ? new Date(workOrderToEdit.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
      setWorkItems(workOrderToEdit.jobDetails.workItems);
      if (workOrderToEdit.jobDetails.materials) {
        setMaterials(workOrderToEdit.jobDetails.materials);
      }
    }
  }, [workOrderToEdit]);

  useEffect(() => {
    const newTotalCost = workItems.reduce((sum, item) => sum + item.cost, 0);
    setTotalCost(newTotalCost);
  }, [workItems]);

  useEffect(() => {
    if (boqSearchQuery) {
        const lowercasedQuery = boqSearchQuery.toLowerCase();
        const filtered = boqItems.filter(item =>
            item.description.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredBoqItems(filtered);
    } else {
        setFilteredBoqItems([]);
    }
  }, [boqSearchQuery, boqItems]);

  const handleSelectBoqItem = (item) => {
    setSelectedBoqItem(item._id);
    setBoqSearchQuery(item.description);
    setFilteredBoqItems([]);
  }

  const handleAddItem = () => {
    if (!selectedBoqItem || quantity <= 0) {
      return;
    }
    const selectedItem = boqItems.find((item) => item._id === selectedBoqItem);
    if (selectedItem) {
      const newItem = {
        boqId: selectedItem._id,
        itemNumber: selectedItem.itemNumber,
        description: selectedItem.description,
        unit: selectedItem.unit,
        rate: selectedItem.rate,
        quantity: parseFloat(quantity),
        cost: selectedItem.rate * parseFloat(quantity),
      };
      setWorkItems([...workItems, newItem]);
      setSelectedBoqItem("");
      setBoqSearchQuery("");
      setQuantity(1);
    }
  };

  const handleRemoveItem = (index) => {
    const newWorkItems = [...workItems];
    newWorkItems.splice(index, 1);
    setWorkItems(newWorkItems);
  };

  const handleAddMaterial = () => {
    if (!materialCode || !materialDescription || materialQuantity <= 0) {
      return;
    }
    const newMaterial = {
      materialCode,
      description: materialDescription,
      quantity: parseFloat(materialQuantity),
    };
    setMaterials([...materials, newMaterial]);
    setMaterialCode("");
    setMaterialDescription("");
    setMaterialQuantity(1);
  };

  const handleRemoveMaterial = (index) => {
    const newMaterials = [...materials];
    newMaterials.splice(index, 1);
    setMaterials(newMaterials);
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
        materials: materials,
      },
      status: status,
      date: date,
      paid: workOrderToEdit ? workOrderToEdit.paid || false : false,
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
        setBoqSearchQuery("");
        setQuantity(1);
        setMaterials([]);
        setMaterialCode("");
        setMaterialDescription("");
        setMaterialQuantity(1);
      }
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full border p-4 rounded-lg border-gray-300"
    >
      <h2 className="font-bold mb-6 text-gray-800">Job Details</h2>

      <section className="mb-8 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
           <InputField
            fieldtype={"date"}
            fieldLabel={"Date"}
            htmlFor={"date"}
            placeholder={"Enter Date"}
            handleChange={(e) => setDate(e.target.value)}
            inputValue={date}
          />
        </div>
      </section>

      <section className="mb-8 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-4 text-gray-700">Work Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 items-end gap-4">
          <div className="sm:col-span-2 relative">
            <InputField
              fieldtype={"text"}
              fieldLabel={"Search Work Done"}
              htmlFor={"boqSearch"}
              placeholder={"Enter description to search..."}
              handleChange={(e) => {
                  setBoqSearchQuery(e.target.value);
                  setSelectedBoqItem("");
              }}
              inputValue={boqSearchQuery}
            />
            {filteredBoqItems.length > 0 && (
              <ul className="border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto bg-white z-10 absolute w-full">
                {filteredBoqItems.map(item => (
                  <li 
                    key={item._id} 
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleSelectBoqItem(item)}
                  >
                    {item.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <InputField
              fieldtype={"number"}
              fieldLabel={"Quantity"}
              htmlFor={"quantity"}
              placeholder={"Quantity"}
              handleChange={(e) => setQuantity(e.target.value)}
              inputValue={quantity}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer w-full"
            >
              Add Item
            </button>
          </div>
        </div>

        <h4 className="font-semibold mt-6 mb-3 text-gray-700">Added Work Items</h4>
        {workItems.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
        ) : (
          <div className="overflow-x-auto lg:overflow-visible bg-white rounded-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item #</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.itemNumber && (typeof item.itemNumber === 'object' ? item.itemNumber.$numberInt : item.itemNumber)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{item.quantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">R {item.rate.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">R {item.cost.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-600 hover:text-red-900 font-medium transition-colors duration-200 cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
        <div className="mt-4 text-right pr-4">
          <h4 className="font-bold text-gray-800">Total Cost: R{totalCost.toFixed(2)}</h4>
        </div>
      </section>

      <section className="mb-8 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-4 text-gray-700">Materials</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-end gap-4">
          <InputField
            fieldtype={"text"}
            fieldLabel={"Material Code"}
            htmlFor={"materialCode"}
            placeholder={"Enter Material Code"}
            handleChange={(e) => setMaterialCode(e.target.value)}
            inputValue={materialCode}
          />
          <InputField
            fieldtype={"text"}
            fieldLabel={"Description"}
            htmlFor={"materialDescription"}
            placeholder={"Enter Description"}
            handleChange={(e) => setMaterialDescription(e.target.value)}
            inputValue={materialDescription}
          />
          <InputField
            fieldtype={"number"}
            fieldLabel={"Quantity"}
            htmlFor={"materialQuantity"}
            placeholder={"Quantity"}
            handleChange={(e) => setMaterialQuantity(e.target.value)}
            inputValue={materialQuantity}
          />
          <div>
            <button
              type="button"
              onClick={handleAddMaterial}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer w-full"
            >
              Add Material
            </button>
          </div>
        </div>

        <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-700">Added Materials</h4>
        {materials.length === 0 ? (
          <p className="text-gray-500">No materials added yet.</p>
        ) : (
          <div className="overflow-x-auto lg:overflow-visible bg-white rounded-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material Code</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{material.materialCode}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{material.description}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{material.quantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveMaterial(index)}
                      className="text-red-600 hover:text-red-900 font-medium transition-colors duration-200 cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </section>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors duration-200 cursor-pointer">
          {workOrderToEdit ? "Update Job" : "Submit Job"}
        </button>
      </div>
    </form>
  );
};

export default WorkOrderForm;
