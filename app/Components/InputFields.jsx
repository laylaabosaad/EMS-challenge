
const InputFields = ({
  label,
  type = "text",
  name,
  id,
  value,
  options = [],
  required = false,
  pattern,
  title,
  placeholder = "",
  onChange,
}) => {
  return (
    <div className="mb-2 w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "select" ? (
        <select
          className="w-full h-[40px] px-[0.5%] py-2 bg-[white] border border-gray-300 rounded-md shadow-sm"
          name={name}
          id={id}
          required={required}
          onChange={onChange}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="w-full h-[40px] px-[0.5%] py-2 bg-[white] border border-gray-300 rounded-md shadow-sm"
          type={type}
          name={name}
          id={id}
          value={value}
          required={required}
          pattern={pattern}
          title={title}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputFields