import { useState } from "react";
import { AxiosError } from "axios";
import { client } from "../../components/axios";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [formData, setFormData] = useState({ name: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await client.post("/api/category", formData);
      alert("Kategori berhasil ditambahkan!");
      navigate("/event/admin");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.errors?.name?.[0] || "Terjadi kesalahan.");
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
     

      <section className="flex flex-col space-y-8 pt-4">
        <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
          <h2 className="font-bold text-4xl">Tambah Kategori</h2>
          <p>Siap menambahkan kategori baru?</p>
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
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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

export default CreateCategory;