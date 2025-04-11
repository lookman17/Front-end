import React from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const EventCard = ({ data, onDelete }) => {
  const navigate = useNavigate();

  // Fungsi untuk memformat tanggal
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Fungsi untuk menangani penghapusan event
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
    <div className="relative flex w-full h-52 text-white bg-[#016A70] shadow-2xl rounded-xl hover:scale-102 transition-transform duration-300">
      
      <section className="flex-none w-1/4 h-auto">
        <img
          src={`http://localhost:8000/storage/${data.image || "default.jpg"}`}
          alt="Event"
          className="object-cover w-full h-full"
          onError={(e) => { e.target.src = "http://localhost:8000/storage/default.jpg"; }} // Tambahkan fallback image jika gambar tidak ditemukan
        />
      </section>

      <section className="flex flex-col flex-grow ml-7 justify-between">
        <div className="p-2 flex-grow">
          <h2 className="text-xl font-bold">{data.name}</h2>
          <p className="text-sm opacity-80 w-96 line-clamp-3">{data.description}</p>
        </div>

        <div className="relative bg-[#088C93] text-sm opacity-80 p-3 rounded-lg mr-7 mb-3">
          <div className=" bg-green-500 text-white text-xs px-4 py-1 rounded-3xl shadow-md w-max">
            Status: {data.status}
          </div>
          <p className="text-[#14FF8D] mt-3">Diposting oleh: <span>{data.user?.username || "Tidak diketahui"}</span></p>
          <p>{formatDate(data.created_at)}</p>
        </div>
      </section>

      <section className="flex flex-col justify-center ml-auto space-y-2 px-3">
        <button
          className="relative flex justify-between items-center px-10 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={() => navigate(`/update_event/${data.id}`)}
        >
          <span>Perbarui</span>
          <FaPen className="absolute right-3" />
        </button>
        <button
          className="relative flex justify-between items-center px-10 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={handleDelete}
        >
          <span>Hapus</span>
          <FaTrash className="absolute right-3" />
        </button>
        <button
          className="relative flex justify-between items-center px-10 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={() => navigate(`/detail_event/${data.id}`)}
        >
          <span>Detail</span>
          <FaInfoCircle className="absolute right-3" />
        </button>
      </section>
    </div>
  );
};

// Validasi properti dengan PropTypes
EventCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired, // ID wajib
    image: PropTypes.string, // Gambar opsional
    name: PropTypes.string.isRequired, // Nama wajib
    description: PropTypes.string, // Deskripsi opsional
    status: PropTypes.string.isRequired, // Status wajib
    created_at: PropTypes.string.isRequired, // Tanggal dibuat wajib
    user: PropTypes.shape({
      username: PropTypes.string, // Username opsional
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // Fungsi hapus wajib
};

export default EventCard;
