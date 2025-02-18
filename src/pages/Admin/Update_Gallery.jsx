import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateGallery = () => {
  const { id } = useParams(); // Get the gallery ID from the route parameter
  const navigate = useNavigate(); // For redirecting after the update
  const [galleryData, setGalleryData] = useState({ title: "", description: "", image: null });
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(null); // Error state for handling fetch errors

  // Fetch gallery data by ID when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/content/${id}`);
        const result = await response.json();
        if (response.ok) {
          setGalleryData(result); // Populate the form fields with existing data
        } else {
          setError(result.message || "Failed to fetch data");
        }
      } catch (error) {
        console.log("Fetch error:", error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false); // Stop loading after data is fetched or error occurs
      }
    };
    fetchData();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
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

      const response = await fetch(`http://localhost:8000/api/content/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      console.log("Response status:", response.status); // Log the response status
      console.log("Response data:", result); // Log the response data

      if (response.ok) {
        alert("Data updated successfully!");
        navigate(`/gallery`); // Redirect to the gallery page (or another page after updating)
      } else {
        alert(result.message || "Failed to update data");
      }
    } catch (error) {
      console.log("Error during update:", error); // Log the error
      alert("An error occurred while updating data");
    }
  };

  // If loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching data, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
      <h1 className="font-bold text-2xl">Update Gallery</h1>

      <section className="flex flex-col space-y-8 pt-4">
        <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
          <h2 className="font-bold text-4xl">Update Gallery</h2>
          <p>Ready to update your gallery photo?</p>
        </div>
      </section>

      <section className="relative flex pt-4">
        <div className="absolute h-[600px] p-20 rounded-2xl text-white bg-[#016A70] z-10"></div>
        <div className="relative w-full ml-[10%] h-full p-28 rounded-4xl bg-white z-20 drop-shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
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
                value={galleryData.description}
                onChange={handleInputChange}
              ></textarea>
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
              />
            </div>
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
