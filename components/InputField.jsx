"use client";

const InputField = ({
  fieldtype,
  fieldLabel,
  htmlFor,
  placeholder,
  handleChange,
  inputValue,
}) => {
  return (
    <fieldset className="mb-2">
      <label htmlFor={htmlFor} className="">
        <span className="font-bold ml-1">{fieldLabel}</span>
        <input
          type={fieldtype}
          className="border w-[100%] mt-1 rounded-s outline-blue-200 border-gray-200 p-1 text-base"
          placeholder={placeholder}
          onChange={(e)=>handleChange(e)}
          value={inputValue}
        />
      </label>
    </fieldset>
  );
};

export default InputField;
