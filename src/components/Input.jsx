export default function Input({value ,label, placeholder, id, name,onChange, type,required, ...props }){
    return (
        <div class="flex flex-col">
  <label class="">{label}</label>
  <input
    class="rounded-md p-2"
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
    )
}