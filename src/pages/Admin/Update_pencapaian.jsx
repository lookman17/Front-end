import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { client } from "../../components/axios";

const EditProfil = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    deskripsi: "",
    image: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await client.get(`/api/profil/${id}`);
        setFormData({
          name: response.data.data.name || "",
          deskripsi: response.data.data.deskripsi || "",
          image: null,
        });
        if (response.data.data.image) {
          setPreviewImage(response.data.data.image);
        }
      } catch (erro) {
        setError("Gagal mengambil data profil.");
      }
    };
    fetchProfile();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files.length > 0) {
      const file = files[0];
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setError("Format file harus berupa JPEG atau PNG.");
        return;
      }
      setFormData((prevData) => ({ ...prevData, [name]: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const updatedData = new FormData();
      updatedData.append("name", formData.name);
      updatedData.append("deskripsi", formData.deskripsi);
      if (formData.image) {
        updatedData.append("image", formData.image);
      }

      const response = await client.post(
        `/api/profil/${id}?_method=PATCH`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Profil berhasil diperbarui!");
        navigate(`/dashboard`);
      } else {
        setError("Gagal memperbarui profil.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Terjadi kesalahan saat memperbarui profil.");
      } else {
        setError("Terjadi kesalahan saat memperbarui profil.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
    

      <section className="flex flex-col space-y-8 pt-4">
        <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
          <h2 className="font-bold text-4xl">Edit Profil</h2>
          <p>Siap memperbarui profil?</p>
        </div>
      </section>

      <section className="relative flex pt-4">
        <div className="absolute h-[580px] p-20 rounded-2xl text-white bg-[#016A70] z-10"></div>
        <div className="relative w-full ml-[10%] h-full p-28 rounded-4xl bg-white z-20 drop-shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama Profil
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <input
                id="deskripsi"
                type="text"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Gambar (Opsional)
              </label>
              <input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-md"
                />
              )}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#088C93] w-full text-center hover:bg-[#065e65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Menyimpan..." : "Update"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditProfil;
