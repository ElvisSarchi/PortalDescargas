export default function Item({ item }) {
  const typeDocument = item?.typeDocument || `FACTURA`;
  const company = item?.companyId || {};
  return (
    <div className="flex flex-1 flex-row border rounded-xl shadow-lg p-2 mt-2 gap-2">
      <div>{typeDocument}</div>
      <div>{`${company?.ruc} - ${company.socialReason}`}</div>
    </div>
  );
}
