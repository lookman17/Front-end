import { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../components/axios";
import EventCard from "../components/EventCard"; // Pastikan ekspor default digunakan
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await client.get("/api/events");
      console.log("Full API Response:", res.data);
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      console.log("Parsed Events:", data);
      setEvents(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching data:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

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
            {new Date().toLocaleDateString("id-ID", { month: "long" }).toLowerCase()}
          </span>{" "}
          / {new Date().getFullYear()}
        </p>

        <section className="flex flex-col space-y-8 pt-4">
          <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
            <h2 className="font-bold text-4xl">Hi, Ferdy</h2>
            <p>Ready to start your day with some events?</p>
          </div>
          <div className="flex flex-col space-y-2">
            <p>Events</p>
            <div className="flex space-x-2 text-white">
              <Link
                to="/Create/Event"
                className="inline-flex items-center justify-center px-4 py-2 bg-[#016A70] text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-[#014F55]"
              >
                <FaPlus className="mr-2" /> Tambahkan Event
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
            ) : events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id} data={event} onDelete={handleDelete} />
              ))
            ) : (
              <div className="text-gray-500">Tidak ada event yang tersedia.</div>
            )}
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default Events;
