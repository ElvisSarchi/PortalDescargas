import moment from "moment";
import { Tooltip } from "react-tooltip";
import useStateWithMerge from "../../Hooks/useStateWithMerge";
import API from "../../Hooks/API";
import Spin from "../ui/spin";

export default function Item({ item }) {
  const [state, setState] = useStateWithMerge({
    isLoadingPDF: false,
  });
  const typeDocument = item?.typeDocument || `FACTURA`;
  const company = item?.companyId || {};
  const numDocument = `${item?.serie}-${item?.sequential}` || ``;
  const emisionDate = moment(item?.emissionDate).format("DD-MM-YYYY") || ``;
  const electronicAccessKey = item?.electronicAccessKey || ``;
  const id = item?._id || null;

  const { isLoadingPDF } = state;

  async function getPDF() {
    try {
      setState({ isLoadingPDF: true });
      const resp = await API.getPDF({
        id,
        typeDocument,
      });
      const url = window.URL.createObjectURL(new Blob([resp.data]));

      // Crea un enlace temporal y lo simula haciendo clic para iniciar la descarga
      const a = document.createElement("a");
      a.href = url;
      a.download = `${numDocument}.pdf`;
      document.body.appendChild(a); // Necesario para Firefox
      a.click();
      document.body.removeChild(a); // Limpia el elemento después de la descarga

      // Libera la URL del Blob
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setState({ isLoadingPDF: false });
    }
  }
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 border dark:bg-saciblackCont rounded-xl shadow-lg p-2 mt-2 gap-4 items-center text-sm">
        <div className="">
          <p>{typeDocument}</p>
          <p>{numDocument}</p>
        </div>
        <div>
          <p className="text-xs">Fecha de Emisión:</p>
          <p className="max-w-max">{emisionDate}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs">Emisor:</p>
          <p>{`${company?.ruc} - ${company.socialReason}`}</p>
        </div>

        <div className="col-span-2">
          <p className="text-xs">Clave de Acceso:</p>
          <p className="break-words">{electronicAccessKey}</p>
        </div>
        <div className="flex flex-row gap-4 justify-center md:justify-start col-span-2">
          <img
            data-tooltip-id="tooltip"
            data-tooltip-content="Descargar XML"
            src="/xml.svg"
            alt="xml"
            className="text-current w-10 bg-white rounded-md cursor-pointer hover:scale-110 delay-75"
          />
          {isLoadingPDF ? (
            <Spin />
          ) : (
            <img
              data-tooltip-id="tooltip"
              data-tooltip-content="Descargar PDF"
              src="/pdf.svg"
              alt="pdf"
              className="w-10 bg-white rounded-md cursor-pointer hover:scale-110 delay-75"
              onClick={getPDF}
            />
          )}
        </div>
      </div>
      <Tooltip id="tooltip" effect="solid" place="bottom" variant="info" />
    </>
  );
}
