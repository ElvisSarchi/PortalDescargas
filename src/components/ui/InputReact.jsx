export default function InputReact({
  value,
  type = "text",
  label = "nombre",
  onChange = () => {},
  placeholder = "Escriba aqui",
  ...props
}) {
  return (
    <div class="flex w-full flex-col gap-1">
      <span className="text-sm">{label}:</span>
      <input
        className="p-1 rounded-lg dark:bg-gray-500/50 bg-zinc-300 w-full border dark:border-gray-950 
        focus:outline-none focus:border-black "
        required=""
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
