import { useState, useEffect } from "react";
import Item from "./Item";
import useStateWithMerge from "../../Hooks/useStateWithMerge";
import moment from "moment";

const DocumentList = ({ documents }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedDocuments, setPaginatedDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [state, setState] = useStateWithMerge({
    filterData: documents,
    totalPages: Math.ceil(documents.length / itemsPerPage),
  });

  const { filterData, totalPages } = state;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filterData.slice(startIndex, endIndex);
    setPaginatedDocuments(paginatedItems);
  }, [currentPage, filterData]);
  useEffect(() => {
    if (search.length === 0) {
      setPaginatedDocuments(documents.slice(0, itemsPerPage));
      setCurrentPage(1);
      setState({
        filterData: documents,
        totalPages: Math.ceil(documents.length / itemsPerPage),
      });
    } else {
      const filteredDocuments = documents.filter((document) => {
        if (document?.typeDocument.toLowerCase().includes(search.toLowerCase()))
          return true;
        if (
          moment(document?.emissionDate)
            .format("DD-MM-YYYY")
            .includes(search.toLowerCase())
        )
          return true;
        if (
          `${document?.serie}-${document?.sequential}`.includes(
            search.toLowerCase()
          )
        )
          return true;
        if (
          `${document?.companyId?.ruc} - ${document?.companyId?.socialReason}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
          return true;
        if (document?.electronicAccessKey?.includes(search.toLowerCase()))
          return true;
      });

      setPaginatedDocuments(filteredDocuments.slice(0, itemsPerPage));
      setCurrentPage(1);
      setState({
        filterData: filteredDocuments,
        totalPages: Math.ceil(filteredDocuments.length / itemsPerPage),
      });
    }
  }, [search]);

  return (
    <div className="w-full">
      <div className="flex flex-row items-center my-1 gap-2">
        <p>Buscar:</p>
        <input
          id="search"
          name="search"
          className="rounded-lg p-2 text-sm md:w-96 bg-sacilightCont dark:bg-saciblackCont  focus:outline-none"
          placeholder="Buscar por documento, fecha, clave acceso o emisor"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-1">
        <ul className="w-full">
          {paginatedDocuments.map((document, index) => (
            <Item key={index} item={document} />
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 md:flex flex-1 justify-between items-center">
        <div>
          <p>
            Mostrando de {currentPage * itemsPerPage - itemsPerPage + 1} a{" "}
            {currentPage * itemsPerPage <= filterData.length
              ? currentPage * itemsPerPage
              : filterData.length}{" "}
            de un total de {filterData.length}
          </p>
        </div>
        <div className="flex flex-1 justify-end items-center gap-2 my-3 mx-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img
              src="/arrow-left.svg"
              alt="arrow-left"
              className="w-8 rounded-lg dark:bg-white bg-saciMenu"
            />
          </button>
          <span>{`${currentPage} de ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img
              src="/arrow-right.svg"
              alt="arrow-left"
              className="w-8 dark:bg-white bg-saciMenu rounded-lg "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
