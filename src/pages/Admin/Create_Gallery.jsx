import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { client } from "../../components/axios"; 
import { useNavigate } from "react-router-dom";

const CreateGallery = () => {
  const [userId, setUserId] = useState(null); // State to store user ID
  const navigate = useNavigate(); // Hook for navigation

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
    title: "",
    image: null,
    description: "",
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Pastikan userId ada di localStorage
      const storedUserId = localStorage.getItem("user_id");
      if (!storedUserId) {
        alert("User ID not found.");
        return;
      }

      // Buat FormData untuk kirim ke server
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image); // Kirim gambar

      // Tambahkan user_id yang diambil dari localStorage
      formDataToSend.append("user_id", storedUserId);

      // Debug: Tampilkan data yang akan dikirim
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      // Kirim data ke API
      const res = await client.post("/api/content", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Gallery successfully added!");
      navigate("/gallery/admin");

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error message:", error.message);
        console.log("Server response:", error.response?.data); // Melihat error dari backend
      }
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

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
      <h1 className="font-bold text-2xl">Tambah Galeri</h1>
      <p>
        <span className="text-green-600">{formattedDate}</span>
      </p>

      <section className="flex flex-col space-y-8 pt-4">
        <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
          <h2 className="font-bold text-4xl">Tambah Galeri</h2>
          <p>Siap memulai hari dengan membuat foto galeri?</p>
        </div>
      </section>

      <section className="relative flex pt-4">
        <div className="absolute h-[600px] p-20 rounded-2xl text-white bg-[#016A70] z-10"></div>
        <div className="relative w-full ml-[10%] h-full p-28 rounded-4xl bg-white z-20 drop-shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Judul
              </label>
              <input
                id="title"
                type="text"
                name="title"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
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
            >
              Simpan
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateGallery;
