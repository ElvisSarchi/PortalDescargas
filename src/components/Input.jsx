export default function Input({
  value,
  label,
  placeholder,
  id,
  name,
  onChange,
  type,
  required,
  ...props
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-900">{label}</label>
      <input
        className="rounded-md p-2 bg-gray-200 text-gray-900 focus:outline-none 
        focus:ring-1 focus:ring-saciblue focus:border-transparent"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
        required={required}
        {...props}
      />
    </div>
  );
}
