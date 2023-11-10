export default function Item({ item }) {
  const typeDocument = item?.typeDocument || `FACTURA`;
  return (
    <div className="flex justify-between p-5">
      <div className="flex">
        <img src="/SaciApp.svg" className="bg-white p-2 h-10 rounded-lg" />
        <div className="flex flex-col justify-center">
          <p className="text-xl font-bold">{item.name}</p>
          <p className="text-sm">{item.description}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xl font-bold">{item.price}</p>
        <p className="text-sm">{item.quantity}</p>
      </div>
    </div>
  );
}
