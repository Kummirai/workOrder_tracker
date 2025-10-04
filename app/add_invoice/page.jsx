import InputField from "@/components/InputField";
import React from "react";

const page = () => {
  return (
    <main className="p-5 pt-3 grid grid-cols-2">
      <h2 className="m-2 font-bold text-2xl">Enter Job Details</h2>
      <form
        action=""
        className="max-w-3xl border p-5 rounded-md border-gray-300 col-start-1 col-end-2"
      >
        <InputField
          fieldType={"text"}
          fieldLabel={"Job Number"}
          htmlFor={"jobNumber"}
          placeholder={"Enter Job Number"}
        />
        <InputField
          fieldType={"text"}
          fieldLabel={"Street Number"}
          htmlFor={"streetNumber"}
          placeholder={"Enter Street Number"}
        />
        <InputField
          fieldType={"text"}
          fieldLabel={"Street Name"}
          htmlFor={"streetName"}
          placeholder={"Enter Street Name"}
        />
        <InputField
          fieldType={"text"}
          fieldLabel={"Surburb"}
          htmlFor={"surburb"}
          placeholder={"Enter Surburb"}
        />
        <InputField
          fieldType={"text"}
          fieldLabel={"City"}
          htmlFor={"city"}
          placeholder={"Enter City"}
        />
        <div className="border border-gray-300 p-3 rounded-s mt-4">
          <InputField
            fieldType={"text"}
            fieldLabel={"Work Done"}
            htmlFor={"city"}
            placeholder={"Work description"}
          />
          <InputField
            fieldType={"number"}
            fieldLabel={"Quantity"}
            htmlFor={"city"}
            placeholder={"Quantity"}
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
      <div className="flex items-center  justify-center">
        <p className="text-center w-[80%] bg-blue-50 border border-blue-400 text-xl text-blue-950 p-2 rounded-md">
          No information yet, add jobs!
        </p>
      </div>
    </main>
  );
};

export default page;
