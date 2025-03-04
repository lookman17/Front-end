import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { client } from "../../components/axios";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    status: "upcoming",
    category_id: "",
    host: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await client.get(`/api/events/${id}`);
        const eventData = response.data.data;
        setFormData({
          name: eventData.name || "",
          description: eventData.description || "",
          date: eventData.date || "",
          start_time: eventData.start_time || "",
          end_time: eventData.end_time || "",
          location: eventData.location || "",
          status: eventData.status || "upcoming",
          category_id: eventData.category_id || "",
          host: eventData.host || "",
          image: null,
        });
        setPreviewImage(eventData.image);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await client.get("/api/category");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchEvent();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => {
      if (name === "image" && files.length > 0) {
        return {
          ...prevData,
          [name]: files[0], 
        };
      } else if (name === "start_time" || name === "end_time") {
        const formattedTime = value.length === 5 ? value : "";
        return {
          ...prevData,
          [name]: formattedTime,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.end_time && formData.end_time <= formData.start_time) {
      alert("Jam selesai harus lebih besar dari jam mulai.");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("_method", "PATCH");

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== "" && formData[key] !== null) {
          if (key === "start_time" || key === "end_time") {
            formDataToSend.append(key, formData[key].slice(0, 5));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      console.log("FormData sebelum dikirim:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await client.post(
        `/api/events/${id}?_method=PATCH`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Server response:", response.data);
      alert("Event updated successfully!");
      navigate(`/event/admin`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error message:", error.message);
        console.log("Server response:", error.response?.data);
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
      <h1 className="font-semibold text-2xl">Update Acara</h1>
      {error && <div className="text-red-500">Error: {error.message}</div>}
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
        <h2 className="font-bold text-4xl">Tambah Event</h2>
        <p>Siap memulai hari dengan membuat event baru?</p>
        </div>
      </section>

      <section className="relative flex pt-4">
        <div className="absolute h-[900px] p-20 rounded-2xl text-white bg-[#016A70] z-10"></div>
        <div className="relative w-full ml-[10%] h-full p-28 rounded-4xl bg-white z-20 drop-shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="" className="block font-sm text-sm text-gray-700">
                {" "}
                Nama
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block font-sm text-sm text-gray-700">
                {" "}
                Deskripsi
              </label>
              <textarea
                name="description"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block font-sm text-sm text-gray-700">
                {" "}
                Tanggal
              </label>
              <input
                type="date"
                name="date"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor=""
                  className="block font-sm text-sm text-gray-700"
                >
                  {" "}
                  Jam Mulai
                </label>
                <input
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block font-sm text-sm text-gray-700"
                >
                  {" "}
                  Waktu Selesai
                </label>
                <input
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block font-sm text-sm text-gray-700"
                >
                  {" "}
                  Lokasi
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block font-sm text-sm text-gray-700"
                >
                  {" "}
                  Status
                </label>
                <select
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="" className="block font-sm text-sm text-gray-700">
                {" "}
                Kategori
              </label>
              
              <select
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
              >
                
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="" className="block font-sm text-sm text-gray-700">
                {" "}
                Host
              </label>
              <input
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="text"
                name="host"
                value={formData.host}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block font-sm text-sm text-gray-700">
                {" "}
                Gambar
              </label>
              <input
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="file"
                name="image"
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#088C93] w-full text-center hover:bg-[#065e65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Loading..." : "Simpan"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateEvent;
