import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const GalleryCard = ({ data, onDelete }) => {
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
    <div className="flex flex-col md:flex-row w-full h-auto md:h-52 text-white bg-[#016A70] shadow-2xl rounded-xl hover:scale-102 transition-transform duration-300 overflow-hidden">
  {/* Gambar */}
  <section className="w-full md:w-1/4 h-52 md:h-auto flex-shrink-0">
    <img
      src={`http://localhost:8000/storage/${data.image || "default.jpg"}`}
      alt="Content"
      className="object-cover w-full h-full"
      onError={(e) => { e.target.src = "http://localhost:8000/storage/default.jpg"; }} 
    />
  </section>

  {/* Konten */}
  <section className="flex flex-col flex-grow p-4 md:ml-7 space-y-3">
    <div className="flex-grow">
      <h2 className="text-lg md:text-xl font-bold">{data.title}</h2>
      <p className="text-sm opacity-80 line-clamp-2">
        {data.description}
      </p>
    </div>

    {/* Info Postingan */}
    <div className="bg-[#088C93] text-xs md:text-sm opacity-80 p-2 rounded-lg">
      <p className="text-[#14FF8D]">
        Diposting oleh:{" "}
        <span>{data.user?.username || "Tidak diketahui"}</span>
      </p>
      <p>{formatDate(data.created_at)}</p>
    </div>
  </section>

  {/* Tombol Aksi */}
  <section className="flex md:flex-col justify-center items-center md:items-end gap-2 p-4 md:pr-5 md:pl-0">
    <button
      className="relative flex items-center justify-between px-6 md:px-10 py-2 md:py-3 bg-[#088C93] rounded-lg w-full md:w-32 hover:bg-[#6bc4c9] transition-all"
      onClick={() => navigate(`/update_gallery/${data.id}`)}
    >
      <span>Perbarui</span>
      <FaPen className="ml-2 md:absolute md:right-3" />
    </button>
    <button
      className="relative flex items-center justify-between px-6 md:px-10 py-2 md:py-3 bg-[#088C93] rounded-lg w-full md:w-32 hover:bg-[#6bc4c9] transition-all"
      onClick={handleDelete}
    >
      <span>Hapus</span>
      <FaTrash className="ml-2 md:absolute md:right-3" />
    </button>
    <button
      className="relative flex items-center justify-between px-6 md:px-10 py-2 md:py-3 bg-[#088C93] rounded-lg w-full md:w-32 hover:bg-[#6bc4c9] transition-all"
      onClick={() => navigate(`/detail_gallery/${data.id}`)}
    >
      <span>Detail</span>
      <FaInfoCircle className="ml-2 md:absolute md:right-3" />
    </button>
  </section>
</div>

  );
};

// Definisi PropTypes untuk validasi properti
GalleryCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GalleryCard;
