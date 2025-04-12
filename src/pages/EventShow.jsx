import { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../components/axios";
import EventCardShow from "../components/EventCardShow";
import { Search } from "lucide-react";
import Pagination from "../components/Pagination"; // Import Pagination component

const EventShow = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const fetchData = async () => {
    try {
      const res = await client.get("/api/events");
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setEvents(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching data:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await client.get("/api/category");
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  // Filter events based on category and search query (search by event name)
  const filteredEvents = events.filter((event) => {
    // Filter by category
    const matchesCategory =
      !selectedCategory || String(event.category_id) === selectedCategory;

    // Filter by search query (searching by event name)
    const matchesSearch =
      (event.name && event.name.toLowerCase().includes(searchQuery.toLowerCase())); // Search by event name

    return matchesCategory && matchesSearch;
  });

  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col space-y-2 m-12 pb-12">
        <section className="flex flex-col space-y-8 pt-4">
          <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
            <h2 className="font-bold text-4xl">Hi, Admin</h2>
            <p>Apakah ada acara yang akan ditambah?</p>
          </div>

          {/* Search Bar */}
          

          {/* Filter by Category */}
          <div className="flex justify-between items-center">
            <select
              className="p-2 border rounded w-1/4"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="flex items-center border p-2 rounded-md bg-white shadow-md w-full md:w-72">
              <Search className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full focus:outline-none text-sm"
              />
            </div>
          </div>
          
          <div className="">
            {isLoading ? (
              <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </section>
            ) : currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <EventCardShow key={event.id} data={event} onDelete={handleDelete} />
              ))
            ) : (
              <div className="text-gray-500 col-span-2 text-center">
                Tidak ada event yang tersedia untuk kategori ini.
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredEvents.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </section>
      </div>
    </Suspense>
  );
};

export default EventShow;
