import { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../../components/axios";
import EventCard from "../../components_admin/EventCard";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Pagination from "../../components/Pagination";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("acara");
  const [eventPage, setEventPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);

  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

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
      console.log("Category data:", res.data.data);
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleDeleteCategory = async (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus kategori ini?"
    );
    if (!isConfirmed) return;

    try {
      const response = await client.delete(`/api/category/${id}`);
      if (response.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
        alert("Kategori berhasil dihapus!");
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
      alert("Gagal menghapus kategori");
    }
  };

  const indexOfLastItem = eventPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  const indexOfLastCategory = categoryPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginateEvents = (pageNumber) => setEventPage(pageNumber);
  const paginateCategories = (pageNumber) => setCategoryPage(pageNumber);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col space-y-2 m-12 pb-12">
       

        <section className="flex flex-col space-y-8 pt-4">
          <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
            <h2 className="font-bold text-4xl">Hi, Admin</h2>
            <p>Apa yang ingin Anda kelola?</p>
          </div>

          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                viewMode === "acara"
                  ? "bg-[#016A70] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setViewMode("acara")}
            >
              Lihat Acara
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                viewMode === "kategori"
                  ? "bg-[#016A70] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setViewMode("kategori")}
            >
              Lihat Kategori
            </button>
          </div>

          {viewMode === "acara" ? (
            <>
              <div className="flex flex-col space-y-2">
                <p>Acara</p>
                <div className="flex space-x-2 text-white">
                  <Link
                    to="/Create/Event"
                    className="inline-flex items-center justify-center px-4 py-2 bg-[#016A70] text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-[#014F55]"
                  >
                    <FaPlus className="mr-2" /> Tambahkan Acara
                  </Link>
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
                ) : currentEvents.length > 0 ? (
                  currentEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      data={event}
                      onDelete={handleDeleteEvent}
                    />
                  ))
                ) : (
                  <div className="text-gray-500">
                    Tidak ada event yang tersedia.
                  </div>
                )}
              </div>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={events.length}
                paginate={paginateEvents}
                currentPage={eventPage}
              />
            </>
          ) : (
            <>
              <div className="flex flex-col space-y-2">
                <p>Kategori</p>
                <div className="flex space-x-2 text-white">
                  <Link
                    to="/Create/Category"
                    className="inline-flex items-center justify-center px-4 py-2 bg-[#016A70] text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-[#014F55]"
                  >
                    <FaPlus className="mr-2" /> Tambahkan Kategori
                  </Link>
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
                ) : categories.length > 0 ? (
                  currentCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-4 border rounded-md bg-[#016A70] text-white"
                    >
                      {category.name}
                      <div className="space-x-2">
                        <button
                          className=""
                          onClick={() =>
                            navigate(`/update_category/${category.id}`)
                          }
                        >
                          <p className="bg-[#088C93] p-2 rounded-md hover:bg-[#233f40]">
                            Perbarui
                          </p>
                        </button>
                        <button
                          className="bg-[#088C93] p-2 rounded-md hover:bg-[#233f40]"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <p>Hapus</p>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">
                    Tidak ada kategori yang tersedia.
                  </div>
                )}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={categories.length}
                  paginate={paginateCategories}
                  currentPage={categoryPage}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </Suspense>
  );
};

export default Events;
