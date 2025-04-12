import React from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const EventCard = ({ data, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus konten ini?"
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/api/events/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Konten berhasil dihapus!");
        onDelete(data.id);
      } else {
        const result = await response.json();
        console.error("Delete failed:", result);
        alert(result.message || "Gagal menghapus konten");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Terjadi kesalahan saat menghapus konten");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-[#016A70] text-white shadow-2xl rounded-xl overflow-hidden hover:scale-102 transition-transform duration-300">
      
      {/* Gambar */}
      <div className="w-full md:w-1/4 h-64 md:h-auto">
        <img
          src={`http://localhost:8000/storage/${data.image || "default.jpg"}`}
          alt="Event"
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.src = "http://localhost:8000/storage/default.jpg";
          }}
        />
      </div>

      {/* Konten */}
      <div className="flex flex-col flex-grow p-4 space-y-3">
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p className="text-sm opacity-80 line-clamp-3">{data.description}</p>

        <div className="bg-[#088C93] text-sm opacity-80 p-3 rounded-lg">
          <div className="bg-green-500 text-white text-xs px-4 py-1 rounded-3xl shadow-md w-max mb-2">
            Status: {data.status}
          </div>
          <p className="text-[#14FF8D]">
            Diposting oleh: <span>{data.user?.username || "Tidak diketahui"}</span>
          </p>
          <p>{formatDate(data.created_at)}</p>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-row md:flex-col justify-center items-center gap-2 p-4 md:w-1/5">
        <button
          className="relative flex justify-between items-center px-6 py-2 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9]"
          onClick={() => navigate(`/update_event/${data.id}`)}
        >
          <span>Perbarui</span>
          <FaPen className="ml-2" />
        </button>
        <button
          className="relative flex justify-between items-center px-6 py-2 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9]"
          onClick={handleDelete}
        >
          <span>Hapus</span>
          <FaTrash className="ml-2" />
        </button>
        <button
          className="relative flex justify-between items-center px-6 py-2 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9]"
          onClick={() => navigate(`/detail_event/${data.id}`)}
        >
          <span>Detail</span>
          <FaInfoCircle className="ml-2" />
        </button>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventCard;
