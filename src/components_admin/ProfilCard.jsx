import React from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileCard = ({ profile, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus konten ini?"
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/api/profil/${profile.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Konten berhasil dihapus!");
        if (onDelete) onDelete(profile.id); // Panggil fungsi dari parent
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

  const profileImage = profile.image
    ? `http://localhost:8000/storage/${profile.image}`
    : "http://localhost:8000/storage/default-profile.jpg";

  return (
    <div className="relative flex w-full h-52 text-white bg-[#016A70] shadow-2xl rounded-xl hover:scale-102 transition-transform duration-300">
      <section className="flex-none w-1/4 h-auto">
        <img
          src={profileImage}
          alt="Profile"
          className="object-cover w-full h-full rounded-l-xl"
          onError={(e) => {
            e.target.src = "http://localhost:8000/storage/default-profile.jpg";
          }}
        />
      </section>

      <section className="flex flex-col flex-grow ml-7 justify-between">
        <div className="p-2 flex-grow">
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm opacity-80 w-96 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {profile.deskripsi}
          </p>
        </div>
      </section>

      <section className="flex flex-col justify-center ml-auto space-y-2 px-3">
        <button
          className="relative flex justify-between items-center px-10 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={() => navigate(`/update_pencapaian/${profile.id}`)}
        >
          <span>Edit</span>
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
          onClick={() => navigate(`/pencapaian/detail/${profile.id}`)}
        >
          <span>Detail</span>
          <FaInfoCircle className="absolute right-3" />
        </button>
      </section>
    </div>
  );
};

// Tambahkan PropTypes untuk validasi
ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired, // ID profil
    image: PropTypes.string, // Gambar profil (opsional)
    name: PropTypes.string.isRequired, // Nama wajib
    deskripsi: PropTypes.string, // Deskripsi (opsional)
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // Fungsi penghapusan wajib
};

export default ProfileCard;
