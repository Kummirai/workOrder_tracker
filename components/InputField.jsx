"use client";

import { FaTimes } from 'react-icons/fa';

const InputField = ({
  fieldtype,
  fieldLabel,
  htmlFor,
  placeholder,
  handleChange,
  inputValue,
  onClear, // New prop for clear functionality
}) => {
  return (
    <fieldset className="mb-2">
      <label htmlFor={htmlFor} className="relative block">
        <span className="font-bold ml-1">{fieldLabel}</span>
        <input
          type={fieldtype}
          className="border w-[100%] mt-1 rounded-s outline-blue-200 border-gray-200 p-1 text-base pr-8" // Added pr-8 for clear button space
          placeholder={placeholder}
          onChange={(e)=>handleChange(e)}
          value={inputValue}
        />
        {inputValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 mt-2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        )}
      </label>
    </fieldset>
  );
};

export default InputField;
