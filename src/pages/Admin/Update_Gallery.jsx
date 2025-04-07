import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { client } from "../../components/axios";

const UpdateGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [galleryData, setGalleryData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/content/${id}?t=${new Date().getTime()}`
        );
        const result = await response.json();

        console.log("Fetched data from API:", result);
        console.log("Fetched data:", result); 
        console.log(
          "Image URL:",
          `http://localhost:8000/storage/${result.image}`
        );

        if (response.ok) {
          setGalleryData({
            title: result.title,
            description: result.description,
            image: null,
          });
          setPreviewImage(result.image);
        } else {
          setError(result.message || "Failed to fetch data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setGalleryData((prevData) => ({ ...prevData, [name]: files[0] }));

      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewImage(imageUrl);
    } else {
      setGalleryData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", galleryData.title);
      formData.append("description", galleryData.description);
      if (galleryData.image) {
        formData.append("image", galleryData.image);
      }

      const response = await client.post(
        `/api/content/${id}?_method=PATCH`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Server Response:", response.data);

      if (response.status === 200) {
        alert("Data updated successfully!");
        navigate(`/gallery/admin`);
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error message:", error.message);
        console.error("Server response:", error.response?.data);
      } else {
        console.error("Error during update:", error);
      }
      alert("An error occurred while updating data");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
    

      {/* Header */}
      <section className="flex flex-col space-y-8 pt-4">
        <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
          <h2 className="font-bold text-4xl">Update Gallery</h2>
          <p>Ready to update your gallery photo?</p>
        </div>
      </section>

      <section className="relative flex pt-4">
        <div className="absolute h-[960px] p-20 rounded-2xl text-white bg-[#016A70] z-10"></div>
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
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
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
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
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
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                onChange={handleInputChange}
              />
              {previewImage && (
                <div className="mt-2">
                  <p>Preview Image:</p>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-96 object-cover h-96 mt-2 rounded-md"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#088C93] w-full hover:bg-[#065e65]"
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
