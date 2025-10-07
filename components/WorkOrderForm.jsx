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
      setDate(workOrderToEdit.date);
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
      className="w-full max-w-3xl border p-4 rounded-lg border-gray-300"
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
          <ul className="border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
            {filteredBoqItems.map(item => (
              <li 
                key={item._id} 
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectBoqItem(item)}
              >
                {item.description}
              </li>
            ))}
          </ul>
        )}
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
            className="rounded-md bg-blue-800 px-3 py-1 hover:bg-blue-700 cursor-pointer"
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
          <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
              <tr>
                <th className="text-left whitespace-nowrap">Item #</th>
                <th className="text-left whitespace-nowrap">Description</th>
                <th className="text-right whitespace-nowrap">Qty</th>
                <th className="text-right whitespace-nowrap">Rate</th>
                <th className="text-right whitespace-nowrap">Cost</th>
                <th className="whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {workItems.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap">{item.itemNumber && (typeof item.itemNumber === 'object' ? item.itemNumber.$numberInt : item.itemNumber)}</td>
                  <td className="whitespace-nowrap">{item.description}</td>
                  <td className="text-right whitespace-nowrap">{item.quantity}</td>
                  <td className="text-right whitespace-nowrap">{item.rate.toFixed(2)}</td>
                  <td className="text-right whitespace-nowrap">{item.cost.toFixed(2)}</td>
                  <td className="text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
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
        <div className="mt-4 text-right">
          <h4 className="text-xl font-bold">Total Cost: R{totalCost.toFixed(2)}</h4>
        </div>
      </div>

      {/* Material Section */}
      <div className="border border-gray-300 p-3 rounded-s mt-4">
        <h3 className="text-lg font-bold mb-2">Materials</h3>
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
        <div className="text-white mt-4">
          <button
            type="button"
            onClick={handleAddMaterial}
            className="rounded-md bg-blue-800 px-3 py-1 hover:bg-blue-700 cursor-pointer"
          >
            Add Material
          </button>
        </div>
      </div>

      {/* Added Materials List */}
      <div className="border border-gray-300 p-3 rounded-s mt-4">
        <h3 className="text-lg font-bold mb-2">Added Materials</h3>
        {materials.length === 0 ? (
          <p>No materials added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
              <tr>
                <th className="text-left whitespace-nowrap">Material Code</th>
                <th className="text-left whitespace-nowrap">Description</th>
                <th className="text-right whitespace-nowrap">Qty</th>
                <th className="whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap">{material.materialCode}</td>
                  <td className="whitespace-nowrap">{material.description}</td>
                  <td className="text-right whitespace-nowrap">{material.quantity}</td>
                  <td className="text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleRemoveMaterial(index)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
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
      </div>

      {/* Submit Button */}
      <div className="text-white mt-4 flex items-center justify-end">
        <button type="submit" className="rounded-md bg-blue-800 px-3 py-1 hover:bg-blue-700 cursor-pointer">
          {workOrderToEdit ? "Update Job" : "Submit Job"}
        </button>
      </div>
    </form>
  );
};

export default WorkOrderForm;
