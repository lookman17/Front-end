import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    status: "",
    category: {},
    host: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${id}`);
        console.log("API Response:", response.data); // Debugging
  
        setEventData(response.data.data); // Ambil dari response.data.data
        console.log("Set Event Data:", response.data.data); // Debugging
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.response?.data?.message || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div><section className="dots-container">
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
  </section></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-12">
          <h1 className="font-semibold text-2xl py-3 text-gray-800">Detail Acara</h1>
          <hr />
      <div className="py-10 flex flex-col md:flex-row">
        {/* Div Kiri */}
        <div className="md:w-1/2 p-7 bg-gray-50 drop-shadow-lg rounded-[50px]">
          {eventData.image && (
            <img
              src={eventData.image.startsWith("http") ? eventData.image : `http://localhost:8000/storage/${eventData.image}`}
              alt="Event Image"
              className="w-full h-96 object-cover rounded-lg mt-4"
            />
          )}
          <h1 className="text-3xl font-bold mt-4">{eventData.name}</h1>
          <p className="text-gray-700 mt-2">{eventData.description}</p>
        </div>
        {/* Div Kanan */}
        <div className="md:w-1/2 p-7 bg-[#088C93] drop-shadow-lg rounded-[50px]">
          {/* Div Atas */}
          <div className="mb-4 bg-white rounded-4xl shadow-2xl">
            <div className="font-semibold bg-white p-4 text-2xl ring-1 rounded-3xl">
              <h1>Detail Acara</h1>
            </div>
            <div className="p-5 text-[16px]">
            <p className="mt-2"><strong>Lokasi :</strong> </p>
            <p>{eventData.location}</p>
            <p className="mt-2"><strong>Tanggal :</strong> {eventData.date}</p>
            <p className="mt-2"><strong>Waktu Mulai - Selesai :</strong></p>
          <p>{eventData.start_time} - {eventData.end_time}</p>
            </div>
          </div>
          {/* Div Bawah */}
          <div className="bg-yellow-300 p-2 rounded-4xl items-center justify-center">
          <p className=" text-center text-white text-2xl ">{eventData.status}</p>
          </div>

          <div className="bg-white rounded-2xl mt-10">
            <div className="p-5 text-[16px]">
            <p className="mt-2"><strong>Kategori:</strong></p>
            <p>{eventData.category.name}</p>
            <p className="mt-2"><strong>Penceramah:</strong> </p>
            <p>{eventData.host}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
