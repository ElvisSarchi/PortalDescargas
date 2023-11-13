import { useState, useEffect } from 'react';
import Item from './Item';

const DocumentList = ({ documents }) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedDocuments, setPaginatedDocuments] = useState([]);
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = documents.slice(startIndex, endIndex);
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
          <Item key={index} item={document} />
        ))}
      </ul>
      <div className='flex flex-1 justify-end items-center gap-2 my-3 mx-2'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src="/arrow-left.svg" alt="arrow-left" className='w-8 bg-white rounded-lg ' />
        </button>
        <span>{`${currentPage} de ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src="/arrow-right.svg" alt="arrow-left" className='w-8 bg-white rounded-lg ' />
        </button>
      </div>
    </div>
  );
};

export default DocumentList;
