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
      <label className="">{label}</label>
      <input
        className="rounded-md p-2"
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
