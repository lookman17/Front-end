import { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../components/axios";
import EventCardShow from "../components/EventCardShow";

const EventShow = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  const filteredEvents = selectedCategory
    ? events.filter((event) => String(event.category_id) === selectedCategory)
    : events;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col space-y-2 m-12 pb-12">
        <h1 className="font-semibold text-2xl">Acara</h1>
        <p>
          <span className="text-green-600">
            {new Date().toLocaleDateString("id-ID", { weekday: "long" })}
          </span>{" "}
          / {String(new Date().getDate()).padStart(2, "0")} /{" "}
          <span>
            {new Date()
              .toLocaleDateString("id-ID", { month: "long" })
              .toLowerCase()}
          </span>{" "}
          / {new Date().getFullYear()}
        </p>

        <section className="flex flex-col space-y-8 pt-4">
          <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
            <h2 className="font-bold text-4xl">Hi, Admin</h2>
            <p>Apakah ada acara yang akan ditambah?</p>
          </div>

          <div className="flex justify-between items-center">
            <p>Filter berdasarkan kategori:</p>
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
          </div>

              {isLoading ? (
              <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </section>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCardShow key={event.id} data={event} onDelete={handleDelete} />
              ))
            ) : (
              <div className="text-gray-500 col-span-2 text-center">
                Tidak ada event yang tersedia untuk kategori ini.
              </div>
            )}
          
        </section>
      </div>
    </Suspense>
  );
};

export default EventShow;
