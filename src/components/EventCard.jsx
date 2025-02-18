import React from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
      "Apakah Anda yakin ingin menghapus event ini?"
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/api/events/${data.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Event berhasil dihapus!");
        onDelete(data.id);
      } else {
        const result = await response.json();
        alert(result.message || "Gagal menghapus event");
      }
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan saat menghapus event");
    }
  };

  return (
    <div className="flex w-full h-auto text-white bg-[#016A70] p-3 shadow-2xl rounded-xl hover:scale-102 transition-transform duration-300">
      {/* Gambar Event */}
      <section className="flex-none w-1/4 h-auto">
        <img
          src={`http://localhost:8000/storage/${data.image || "default.jpg"}`}
          alt="Event"
          className="object-cover w-full h-full rounded-lg"
          onError={(e) => { e.target.src = "http://localhost:8000/storage/default.jpg"; }} // Tambahkan fallback image jika gambar tidak ditemukan
        />
      </section>

      {/* Detail Event */}
      <section className="flex flex-col flex-grow ml-7 space-y-3">
        <div>
          <h2 className="text-xl font-bold">{data.name}</h2>
          <p className="text-sm opacity-80 w-96">{data.description}</p>
          <p className="text-sm opacity-80 w-96">Lokasi: {data.location}</p>
          <p className="text-sm opacity-80 w-96">Tanggal: {formatDate(data.date)}</p>
          <p className="text-sm opacity-80 w-96">Waktu Mulai: {data.start_time}</p>
          <p className="text-sm opacity-80 w-96">Waktu Selesai: {data.end_time}</p>
          <p className="text-sm opacity-80 w-96">Status: {data.status}</p>
        </div>

        {/* Informasi Postingan */}
        <div className="bg-[#088C93] text-sm opacity-80 p-1 rounded-lg mr-7 mt-10">
          <p className="text-[#14FF8D]">
            Diposting oleh:{" "}
            <span>{data.user?.username || "Tidak diketahui"}</span>
          </p>
          <p>{formatDate(data.created_at)}</p>
        </div>
      </section>

      {/* Tombol Aksi */}
      <section className="flex flex-col justify-center ml-auto space-y-2">
        <button
          className="relative flex justify-between items-center px-4 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={() => navigate(`/update_event/${data.id}`)}
        >
          <span>Update</span>
          <FaPen className="absolute right-3" />
        </button>
        <button
          className="relative flex justify-between items-center px-4 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={handleDelete}
        >
          <span>Hapus</span>
          <FaTrash className="absolute right-3" />
        </button>
        <button
          className="relative flex justify-between items-center mr-12 px-4 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={() => navigate(`/detail_event/${data.id}`)}
        >
          <span>Detail</span>
          <FaInfoCircle className="absolute right-3" />
        </button>
      </section>
    </div>
  );
};

// Pastikan komponen diekspor dengan benar
export default EventCard;
