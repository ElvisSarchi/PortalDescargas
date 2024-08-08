import moment from "moment";
import { Tooltip } from "react-tooltip";
import useStateWithMerge from "../../Hooks/useStateWithMerge";
import Spin from "../ui/spin";
import { Alert, toast } from "../ui/Alert";
import { DocumentTypes } from "../../constants";
export default function Item({ item }) {
  const [state, setState] = useStateWithMerge({
    isLoadingPDF: false,
    isLoadingXML: false,
  });
  const typeDocument = item?.typeDocument || `Factura`;
  const company = item?.companyId || {};
  const numDocument = `${item?.serie}-${item?.sequential}` || ``;
  const emisionDate = moment(item?.emissionDate).format("DD-MM-YYYY") || ``;
  const electronicAccessKey = item?.electronicAccessKey || ``;
  const id = item?._id || null;
  const isCanceled = item?.isCanceled || false;

  const { isLoadingPDF, isLoadingXML } = state;

  async function getPDF() {
    try {
      setState({ isLoadingPDF: true });
      const resp = await fetch(`/api/documents/pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          typeDocument,
        }),
      });
      console.log(resp)
      if (resp.status === 404) {
        toast.error("No se pudo generar el PDF");
        return;
      }
      if (resp.status === 500) {
        toast.error("No se pudo generar el PDF");
        return;
      }
      const url = window.URL.createObjectURL(await resp.blob());
      window.open(url, "_blank");
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setState({ isLoadingPDF: false });
    }
  }
  async function getXML() {
    try {
      setState({ isLoadingXML: true });
      const resp = await fetch(`/api/documents/xml`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          typeDocument,
          electronicAccessKey,
        }),
      });
      if (resp.status === 404) {
        toast.error("No se encontro el archivo XML");
        return;
      }
      if (resp.status === 500) {
        toast.error("El XML ya no se encuentra en el SRI");
        return;
      }
      if (resp.status === 200) {
        const url = window.URL.createObjectURL(await resp.blob());
        // Crea un enlace temporal y lo simula haciendo clic para iniciar la descarga
        const a = document.createElement("a");
        a.href = url;
        a.download = `${numDocument}.xml`;
        document.body.appendChild(a); // Necesario para Firefox
        a.click();
        document.body.removeChild(a); // Limpia el elemento después de la descarga

        // Libera la URL del Blob
        window.URL.revokeObjectURL(url);
      } else {
        toast.error("Error al descargar el archivo XML");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setState({ isLoadingXML: false });
    }
  }
  return (
    <>
      <Alert />
      <div
        className="grid grid-cols-2 md:grid-cols-4 border dark:border-gray-700 bg-sacilightCont
      dark:bg-saciblackCont dark:hover:bg-saciblackCont/40 hover:bg-sacilightCont/40 rounded-xl shadow-lg p-2 mt-2 
      gap-1 items-center text-sm"
      >
        <div className="">
          {isCanceled ? (
            <p className="bg-red-500/80 rounded-md px-2 py-1 max-w-max">
              {typeDocument} Anulada
            </p>
          ) : (
            <p
              className={`
            ${
              typeDocument === DocumentTypes.NumberingInvoice
                ? "bg-blue-500/80"
                : ""
            }
            ${
              typeDocument === DocumentTypes.NumberingCreditNote
                ? "bg-yellow-500/80"
                : ""
            }
            ${
              typeDocument === DocumentTypes.NumberingDebitNote
                ? "bg-cyan-500/80"
                : ""
            }
            ${
              typeDocument === DocumentTypes.NumberingRetention
                ? "bg-purple-500/80"
                : ""
            }
            ${
              typeDocument === DocumentTypes.NumberingReferralGuide
                ? "bg-orange-500/80"
                : ""
            }
            ${
              typeDocument === DocumentTypes.NumberingPurchaseSettlement
                ? "bg-pink-500/80"
                : ""
            }
            rounded-md text-white px-2 py-1 max-w-max
            `}
            >
              {typeDocument}
            </p>
          )}
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
          <div className="break-words">{electronicAccessKey}</div>
        </div>
        <div className="flex flex-row gap-4 justify-center md:justify-start col-span-2">
          {isLoadingXML ? (
            <Spin />
          ) : (
            <img
              data-tooltip-id="tooltip"
              data-tooltip-content="Descargar XML"
              src="/xml.svg"
              alt="xml"
              className="text-current w-8 bg-white rounded-md cursor-pointer hover:scale-110 delay-75"
              onClick={getXML}
            />
          )}
          {isLoadingPDF ? (
            <Spin />
          ) : (
            <img
              data-tooltip-id="tooltip"
              data-tooltip-content="Visualizar PDF"
              src="/pdf.svg"
              alt="pdf"
              className="w-8 bg-white rounded-md cursor-pointer hover:scale-110 delay-75"
              onClick={getPDF}
            />
          )}
        </div>
      </div>
      <Tooltip id="tooltip" effect="solid" place="bottom" variant="info" />
    </>
  );
}
