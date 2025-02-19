import React from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GalleryCard = ({ data, onDelete }) => {
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

  // Fungsi untuk menangani penghapusan konten
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus konten ini?"
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/api/content/${data.id}`, {
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
    <div className="flex w-full h-auto text-white p-2 bg-[#016A70] shadow-2xl rounded-xl hover:scale-102 transition-transform duration-300">
      {/* Gambar Konten */}
      <section className="flex-none w-1/4">
        <img
          src={`http://localhost:8000/storage/${data.image || "default.jpg"}`}
          alt="Content"
          className="object-cover w-full h-full"
          onError={(e) => { e.target.src = "http://localhost:8000/storage/default.jpg"; }} // Tambahkan fallback image jika gambar tidak ditemukan
        />
      </section>
      <section className="flex flex-col flex-grow ml-7 space-y-3">
        <div className="p-2 flex-grow">
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-sm opacity-80 w-96 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {data.description}
          </p>
        </div>

        {/* Informasi Postingan */}
        <div className="bg-[#088C93] text-sm opacity-80 p-2 rounded-lg mr-7">
          <p className="text-[#14FF8D]">
            Diposting oleh:{" "}
            <span>{data.user?.username || "Tidak diketahui"}</span>
          </p>
          <p>{formatDate(data.created_at)}</p>
        </div>
      </section>

      {/* Tombol Aksi */}
      <section className="flex flex-col justify-center ml-auto space-y-2 p-5">
        <button
          className="relative flex justify-between items-center px-10 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={() => navigate(`/update_gallery/${data.id}`)}
        >
          <span>Update</span>
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
          onClick={() => navigate(`/detail_gallery/${data.id}`)}
        >
          <span>Detail</span>
          <FaInfoCircle className="absolute right-3" />
        </button>
      </section>
    </div>
  );
};

export default GalleryCard;
