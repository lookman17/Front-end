import React from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const GalleryCard = ({ data, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    // Confirm before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/api/content/${data.id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        alert("Data deleted successfully!");
        onDelete(data.id); // Remove the item from state
      } else {
        alert(result.message || "Failed to delete data");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while deleting data");
    }
  };

  return (
    <div className="flex w-full h-48 text-white bg-[#016A70] p-3 shadow-2xl rounded-xl hover:scale-102 transition-transform duration-300">
      <section className="flex-none w-1/4 h-auto">
        <img
          src={`http://localhost:8000/storage/${data.image}`}
          alt="gambar"
          className="object-cover w-full h-full rounded-lg"
        />
      </section>
      <section className="flex flex-col flex-grow ml-7 space-y-3">
        <div>
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-sm opacity-80 w-96">{data.description}</p>
        </div>
        <div className="bg-[#088C93] text-sm opacity-80 p-1 rounded-lg mr-7 mt-10">
          <p className="text-[#14FF8D]">
            Posted by: <span className="">{data.user?.username || "Unknown"}</span>
          </p>
          <p>{formatDate(data.created_at)}</p>
        </div>
      </section>
      <section className="flex flex-col justify-center ml-auto space-y-2">
        <button
          className="relative flex justify-between items-center px-4 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={() => navigate(`/update_gallery/${data.id}`)}
        >
          <span>Update</span>
          <FaPen className="absolute right-3" />
        </button>
        <button
          className="relative flex justify-between items-center px-4 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={handleDelete}
        >
          <span>Delete</span>
          <FaTrash className="absolute right-3" />
        </button>
        <button
          className="relative flex justify-between items-center mr-12 px-4 py-3 bg-[#088C93] rounded-lg w-full hover:bg-[#6bc4c9] ease-in-out"
          onClick={() => navigate(`/detail_gallery/${data.id}`)}
        >
          <span>Detail</span>
          <FaInfoCircle className="absolute right-3" />
        </button>
      </section>
    </div>
  );
};
