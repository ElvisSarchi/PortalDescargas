import { useState, useEffect } from 'react';

const DocumentList = ({ documents }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedDocuments, setPaginatedDocuments] = useState([]);
  console.log(documents);
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = documents.slice(startIndex, endIndex);
    console.log(paginatedItems);
    setPaginatedDocuments(paginatedItems);
  }, [currentPage, documents]);

  const totalPages = Math.ceil(documents.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2>Document List</h2>
      <ul>
        {paginatedDocuments.map((document, index) => (
          <li key={index}>{JSON.stringify(document)}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DocumentList;
