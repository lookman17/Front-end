import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { client } from "../../components/axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [userId, setUserId] = useState(null); // State to store user ID
  const navigate = useNavigate(); // Hook for navigation
  const [categories, setCategories] = useState([]); // State to store categories
  const [error, setError] = useState(null); // State to store any error
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state

  const formattedDate = new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(/,/g, " /")
    .toLowerCase();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    status: "upcoming", // Default status
    category: "",
    host: "",
    image: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await client.get("/api/category");
        console.log("API Response:", response.data); // Debug response API

        // Pastikan kita mengambil `data` yang berisi array kategori
        setCategories(response.data.data || []);
        console.log("Categories state:", response.data.data); // Debug state kategori
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
      }
    };

    fetchCategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (formData.endTime <= formData.startTime) {
      alert("Jam selesai harus lebih besar dari jam mulai.");
      setIsLoading(false);
      return;
    }
  
    try {
      const storedUserId = localStorage.getItem("user_id");
      if (!storedUserId) {
        alert("User ID not found.");
        setIsLoading(false);
        return;
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("start_time", formData.startTime);
      formDataToSend.append("end_time", formData.endTime);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("category_id", formData.category);
      formDataToSend.append("user_id", storedUserId);
      formDataToSend.append("host", formData.host);
      formDataToSend.append("image", formData.image);
  
      const res = await client.post("/api/events", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Event created successfully!");
      navigate("/event/admin");
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
  
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Ensure the image is stored in formData
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  if (error) {
    return (
      <div className="text-red-500">
        Error: {error.response?.data?.message || error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
      <h1 className="font-semibold text-2xl">Tambah Acara</h1>
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
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Tanggal
              </label>
              <input
                id="date"
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
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jam Mulai
                </label>
                <input
                  id="startTime"
                  type="time"
                  name="startTime"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jam Selesai
                </label>
                <input
                  id="endTime"
                  type="time"
                  name="endTime"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lokasi
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Kategori
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 p-2 block w-full border-gray-300 shadow-sm"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Pilih kategori...
                </option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
              </select>
            </div>
            <div>
              <label
                htmlFor="host"
                className="block text-sm font-medium text-gray-700"
              >
                Host
              </label>
              <input
                id="host"
                type="text"
                name="host"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.host}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Gambar
              </label>
              <input
                id="image"
                type="file"
                name="image"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#088C93] w-full text-center hover:bg-[#065e65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Simpan"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateEvent;
