"use client";

import InputField from "@/components/InputField";
import React, { use } from "react";
import { useState } from "react";

const page = () => {
  const [jobNumber, setJobNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [surburb, setSurburb] = useState("");
  const [city, setCity] = useState("");
  const [workDone, setWorkDone] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [jobAddress, setJobAddress] = useState([]);

  const jobData = 
    {
      jobAddress: {
        jobNumber: jobNumber,
        streetName: streetName,
        streetNumber: streetNumber,
        surburb: surburb,
        city: city,
      },
      jobDetails: {
        cost: ` ${workDone}: ${quantity} `,
      },
    }

  const AddJobDetails = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/add_invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobData }),
    });
    const data = await response.json();
    setJobAddress(data);
    console.log(jobAddress);
  };

  return (
    <main className="p-5 px-10 pt-3 grid grid-cols-2 gap-4">
      <h2 className="m-2 font-bold text-2xl">Enter Job Details</h2>

      <form
        action=""
        className="max-w-3xl border p-4 rounded-lg border-gray-300 col-start-1 col-end-2"
      >
        <div className="border border-gray-200 p-4 rounded-s mt-4">
          <InputField
            fieldType={"text"}
            fieldLabel={"Job Number"}
            htmlFor={"jobNumber"}
            placeholder={"Enter Job Number"}
            handleChange={(e) => setJobNumber(e.target.value)}
            inputValue={jobNumber}
          />
          <InputField
            fieldType={"text"}
            fieldLabel={"Street Number"}
            htmlFor={"streetNumber"}
            placeholder={"Enter Street Number"}
            handleChange={(e) => setStreetNumber(e.target.value)}
            inputValue={streetNumber}
          />
          <InputField
            fieldType={"text"}
            fieldLabel={"Street Name"}
            htmlFor={"streetName"}
            placeholder={"Enter Street Name"}
            handleChange={(e) => setStreetName(e.target.value)}
            inputValue={streetName}
          />
          <InputField
            fieldType={"text"}
            fieldLabel={"Surburb"}
            htmlFor={"surburb"}
            placeholder={"Enter Surburb"}
            handleChange={(e) => setSurburb(e.target.value)}
            inputValue={surburb}
          />
          <InputField
            fieldType={"text"}
            fieldLabel={"City"}
            htmlFor={"city"}
            placeholder={"Enter City"}
            handleChange={(e) => setCity(e.target.value)}
            inputValue={city}
          />
          <div className="text-white mt-4 flex items-center justify-start">
            <button
              onClick={(e) => AddJobDetails(e)}
              className="rounded-md bg-blue-800 px-3 py-1"
            >
              Add job details
            </button>
          </div>
        </div>
        <div className="border border-gray-300 p-3 rounded-s mt-4">
          <InputField
            fieldType={"text"}
            fieldLabel={"Work Done"}
            htmlFor={"workDone"}
            placeholder={"Work description"}
            handleChange={(e) => setWorkDone(e.target.value)}
            inputValue={workDone}
          />
          <InputField
            fieldType={"number"}
            fieldLabel={"Quantity"}
            htmlFor={"quantity"}
            placeholder={"Quantity"}
            handleChange={(e) => setQuantity(e.target.value)}
            inputValue={quantity}
          />
          <div className="text-white mt-4">
            <button className="rounded-md bg-blue-800 px-3 py-1">
              Add Item
            </button>
          </div>
        </div>
        <div className="text-white mt-4 flex items-center justify-end">
          <button className="rounded-md bg-blue-800 px-3 py-1">
            Submit Job
          </button>
        </div>
      </form>
      <div className="flex items-center  justify-center border border-gray-300 rounded-md">
        <p className="text-center w-[80%] bg-blue-50 border border-blue-400 text-xl text-blue-950 p-2 rounded-md">
          No information yet, add a job!
        </p>
      </div>
    </main>
  );
};

export default page;
