import { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../../components/axios";
import GalleryCard from "../../components_admin/GalleryCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Search } from "lucide-react";
import Pagination from "../../components/Pagination";

const Gallery = () => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ⬅️ Search term
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const updateItemsPerPage = () => {
    if (window.innerWidth < 768) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(5);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.get("/api/content");
        const data = Array.isArray(res.data) ? res.data : [];
        setContents(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Error fetching data:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage();
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleDelete = (id) => {
    setContents((prevContents) => prevContents.filter((content) => content.id !== id));
  };

  // ⬇️ Filter berdasarkan pencarian
  const filteredContents = contents.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContents = filteredContents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col space-y-2 m-12 pb-12">
        <section className="flex flex-col space-y-8 pt-4">
          <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
            <h2 className="font-bold text-4xl">Hi, Admin</h2>
            <p>Siapkah menambah album hari ini?</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-col space-y-2">
              <p>Contents</p>
              <Link
                to="/Create/Gallery"
                className="inline-flex items-center justify-center px-4 py-2 bg-[#016A70] text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-[#014F55]"
              >
                <FaPlus className="mr-2" /> Add New Content
              </Link>
            </div>
            {/* Search Input */}
            <div className="flex items-center border p-2 rounded-md bg-white shadow-md w-full md:w-72">
              <Search className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </section>
            ) : currentContents.length > 0 ? (
              currentContents.map((content) => (
                <GalleryCard key={content.id} data={content} onDelete={handleDelete} />
              ))
            ) : (
              <div className="text-gray-500">Tidak ada album ditemukan.</div>
            )}
          </div>

          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredContents.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </section>
      </div>
    </Suspense>
  );
};

export default Gallery;
