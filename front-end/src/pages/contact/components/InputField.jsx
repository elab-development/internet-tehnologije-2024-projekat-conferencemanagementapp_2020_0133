function InputField({ label, name, value, onChange, required = false }) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block font-light ">
        {label}
        {required ? <span className="text-red-700">*</span> : ""}
      </label>
      <input
        name={name}
        type="text"
        className="w-full p-2 border border-gray-400 rounded-lg  outline-none
        focus:shadow-[0px_0px_2px_2px] shadow-blue-200 focus:border-blue-700 focus:border-1"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default InputField;