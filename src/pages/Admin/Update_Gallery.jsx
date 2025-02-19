import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { client } from "../../components/axios";

const UpdateGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [galleryData, setGalleryData] = useState({ title: "", description: "", image: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data saat komponen dimuat
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/content/${id}`);
        const result = await response.json();
        if (response.ok) {
          setGalleryData(result);
        } else {
          setError(result.message || "Failed to fetch data");
        }
      } catch (error) {
        console.log("Fetch error:", error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setGalleryData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setGalleryData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!galleryData.title || !galleryData.description) {
      alert("Please fill in both title and description.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", galleryData.title);
      formData.append("description", galleryData.description);
      if (galleryData.image) {
        formData.append("image", galleryData.image);
      }

      const response = await client.patch(`/api/content/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.data;
      console.log("Response status:", response.status);
      console.log("Response data:", result);

      if (response.status === 200) {
        alert("Data updated successfully!");
        navigate(`/gallery/admin`);
      } else {
        alert(result.message || "Failed to update data");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error message:", error.message);
        console.log("Server response:", error.response?.data);
      } else {
        console.log("Error during update:", error);
      }
      alert("An error occurred while updating data");
    }
  };

  // Tampilkan loading jika data sedang diambil
  if (loading) {
    return <div>Loading...</div>;
  }

  // Tampilkan error jika terjadi kesalahan
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
      <h1 className="font-bold text-2xl">Update Gallery</h1>

      {/* Header Section */}
      <section className="flex flex-col space-y-8 pt-4">
        <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
          <h2 className="font-bold text-4xl">Update Gallery</h2>
          <p>Ready to update your gallery photo?</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative flex pt-4">
        <div className="absolute h-[600px] p-20 rounded-2xl text-white bg-[#016A70] z-10"></div>
        <div className="relative w-full ml-[10%] h-full p-28 rounded-4xl bg-white z-20 drop-shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Judul
              </label>
              <input
                id="title"
                type="text"
                name="title"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={galleryData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={galleryData.description}
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
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#088C93] w-full text-center hover:bg-[#065e65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateGallery;