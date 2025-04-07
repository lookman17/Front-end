import PropTypes from "prop-types";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const maxPageNumbers = 10; // Limit pagination to 10 pages

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage) && i <= maxPageNumbers; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center space-x-2 mt-4">
      {pageNumbers.map((number) => (
        <figure
          key={number}
          onClick={() => paginate(number)}
          className={`flex items-center justify-center text-2xl font-extrabold leading-none text-zinc-400 p-4 bg-white relative rounded-full object-cover border border-solid border-zinc-300 cursor-pointer 
            ${currentPage === number ? "size-16 z-6" : ""} 
            ${number === 1 || number === 2 ? "size-11 z-4" : ""} 
            ${number === 3 ? "size-8 z-3" : ""}`}
        >
          {number}
        </figure>
      ))}
    </nav>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
