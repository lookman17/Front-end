import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PencapaianDetail = () => {
  const { id } = useParams();
  const [achievementData, setAchievementData] = useState({
    name: "",
    description: "",
    image: "",
    created_at: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/profil/${id}`);
        setAchievementData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-12">
      <h1 className="font-semibold text-2xl">Detail Pencapaian</h1>
     
      <div className="py-10">
        {achievementData.image && (
          <img
            src={`http://localhost:8000/storage/${achievementData.image}`}
            alt={`Pencapaian ${achievementData.name}`}
            className="w-full h-96 object-cover rounded-lg mt-4"
            onError={(e) => {
              e.target.src = "http://localhost:8000/storage/default.jpg";
            }}
          />
        )}
        <h1 className="text-3xl font-bold mt-4">{achievementData.name}</h1>
        <p className="text-gray-700 mt-2">
          {achievementData.deskripsi || "Deskripsi pencapaian belum tersedia."}
        </p>
        {achievementData.created_at && (
          <p className="text-gray-500 text-sm mt-2">
            {" "}
            {new Date(achievementData.created_at).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default PencapaianDetail;
