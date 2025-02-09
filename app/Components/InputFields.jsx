// InputFields.tsx
const InputFields = ({
  label,
  name,
  id,
  type = "text", // Default to "text" type if not provided
  required,
  placeholder,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>

      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value} // Ensure value is set correctly
          onChange={onChange}
          required={required}
          className="p-2 border rounded"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options &&
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="p-2 border rounded"
        />
      )}
    </div>
  );
};

export default InputFields;
