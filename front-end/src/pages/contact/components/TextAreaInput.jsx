function TextAreaInput({
  label,
  name,
  value,
  onValueChange,
  required = false,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor="name" className="font-light">
        {label}
        {required ? <span className="text-red-700 block">*</span> : ""}
      </label>
      <textarea
        className="w-full border border-gray-400 rounded-lg h-full outline-none p-2 
        focus:shadow-[0px_0px_2px_2px] shadow-blue-200 focus:border-blue-700 focus:border-1"
        name={name}
        onChange={onValueChange}
        required={required}
        value={value}
      ></textarea>
    </div>
  );
}

export default TextAreaInput;
