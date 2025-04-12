import  { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../components/axios";
import { Search } from "lucide-react";
import { GalleryCardShow } from "../components/GalleryCardShow";
import Pagination from "../components/Pagination"; 
import "./Gallery.css";

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 

  const fetchData = async () => {
    try {
      const res = await client.get("/api/content");
      console.log("Full API Response:", res.data);
      const data = Array.isArray(res.data) ? res.data : [];
      console.log("Parsed Contents:", data);
      setContents(data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching data:", error.message);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredContents = contents.filter((Gallery) =>
    Gallery.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className="font-bold text-4xl">Hi, Santri</h2>
            <p>Berikut ini adalah album atau kegiatan TPQ</p>
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <GalleryCardShow key={content.id} data={content} />
              ))
            ) : (
              <div className="text-gray-500">No contents available.</div>
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

export default ContentList;
