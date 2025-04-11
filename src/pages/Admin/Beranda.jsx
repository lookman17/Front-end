import { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../../components/axios";
import CardProfile from "../../components_admin/ProfilCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Pagination from "../../components/Pagination";

const ProfilList = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchProfiles = async () => {
    try {
      const res = await client.get("/api/profil");
      console.log("API Response:", res.data);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      console.log("Parsed Profiles:", data);
      setProfiles(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching profiles:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleDelete = (id) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfiles = profiles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col space-y-2 m-12 pb-12">
        <section className="flex flex-col space-y-8 pt-4">
          <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
            <h2 className="font-bold text-4xl">Hi, Admin</h2>
            <p>Siapkah menambah Pencapaian hari ini?</p>
          </div>

          <div className="flex flex-col space-y-2">
            <p>Contents</p>
            <div className="flex space-x-2 text-white">
              <Link
                to="/profil/create"
                className="inline-flex items-center justify-center px-4 py-2 bg-[#016A70] text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-[#014F55]"
              >
                <FaPlus className="mr-2" /> Tambah Pencapaian
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </section>
            ) : currentProfiles.length > 0 ? (
              currentProfiles.map((profile) => (
                <CardProfile
                  key={profile.id}
                  profile={profile}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-gray-500">Tidak ada data profil</div>
            )}
          </div>

          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={profiles.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </section>
      </div>
    </Suspense>
  );
};

export default ProfilList;
