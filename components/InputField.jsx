"use client";

const InputField = ({ fieldtype, text, fieldLabel, htmlFor, placeholder }) => {
  return (
    <fieldset className="mb-2">
      <label htmlFor="jobNumber" className="">
        <span className="font-bold ml-1">{fieldLabel}</span>
        <input
          type={text}
          className="border w-[100%] mt-1 rounded-s outline-blue-200 border-gray-300 p-1"
          placeholder={placeholder}
        />
      </label>
    </fieldset>
  );
};

export default InputField;
