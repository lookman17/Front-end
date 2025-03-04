import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { client } from "../../components/axios";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await client.get(`/api/category/${id}`);
        const categoryData = response.data.data;
        setFormData({
          name: categoryData.name || "",
        });
      } catch (error) {
        setError("Gagal mengambil data kategori.");
      }
    };

    fetchCategory();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await client.patch(`/api/category/${id}`, formData);
      alert("Kategori berhasil diperbarui!");
      navigate("/event/admin");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.errors?.name?.[0] || "Terjadi kesalahan.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
      <h1 className="font-semibold text-2xl">Update Kategori</h1>
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
          <h2 className="font-bold text-4xl">Update Kategori</h2>
          <p>Silakan perbarui informasi kategori.</p>
        </div>
      </section>

      <section className="relative flex pt-4">
        <div className="absolute h-[480px] p-20 rounded-2xl text-white bg-[#016A70] z-10"></div>
        <div className="relative w-full ml-[10%] h-full p-28 rounded-4xl bg-white z-20 drop-shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama Kategori
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

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#088C93] w-full text-center hover:bg-[#065e65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "Memperbarui..." : "Simpan Perubahan"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateCategory;
