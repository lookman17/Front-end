import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPaperPlane, } from "react-icons/fa";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa"; // Tambahkan ikon titik tiga

const GalleryDetail = () => {
  const { id } = useParams();

  const [showDeleteOption, setShowDeleteOption] = useState(null); // State untuk kontrol menu hapus
  const [notification, setNotification] = useState(null);

  const toggleDeleteOption = (commentId) => {
    setShowDeleteOption(showDeleteOption === commentId ? null : commentId);
  };

  const [galleryData, setGalleryData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("user_id"); // Ambil user_id dari localStorage

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/comments/${id}`
      );
      setComments(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil komentar:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const galleryResponse = await axios.get(
          `http://localhost:8000/api/content/${id}`
        );
        setGalleryData(galleryResponse.data);
        await fetchComments();
      } catch (err) {
        setError(
          err.response?.data?.message || "Terjadi kesalahan saat mengambil data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setNotification("Anda harus login terlebih dahulu untuk berkomentar.");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/comments", {
        gallery_id: id,
        user_id: userId,
        content: newComment,
      });

      setNewComment("");
      await fetchComments();
    } catch (err) {
      console.error("Gagal menambahkan komentar:", err.response?.data || err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}`);
      await fetchComments();
    } catch (err) {
      console.error("Gagal menghapus komentar:", err.response?.data || err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className=" m-12">
      <h1 className="font-semibold text-2xl">Detail Album</h1>
      <p>
        <span className="text-green-600">
          {new Date().toLocaleDateString("id-ID", { weekday: "long" })}
        </span>{" "}
        / {String(new Date().getDate()).padStart(2, "0")} /{" "}
        <span>
          {new Date()
            .toLocaleDateString("id-ID", { month: "long" })
            .toLowerCase()}
        </span>{" "}
        / {new Date().getFullYear()}
      </p>
      <div className="py-10 flex flex-col md:flex-row">
        {/* BAGIAN GALERI */}

        <div className="md:w-2/3 p-7 bg-gray-50 drop-shadow-lg rounded-[50px]">
          <img
            src={
              galleryData.image.startsWith("http")
                ? galleryData.image
                : `http://localhost:8000/storage/${galleryData.image}`
            }
            alt={galleryData.title}
            className="w-full h-96 object-cover rounded-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{galleryData.title}</h1>

          <p className="text-gray-700 mt-2">{galleryData.description}</p>
        </div>

        {/* BAGIAN KOMENTAR */}
        <div className="w-[450px] max-w-md p-5 bg-[#016A70] rounded-[30px] text-white flex flex-col">
          <div className="flex-grow space-y-2">
            {comments.slice(0, 6).map((comment, index) => (
              <div
                key={index}
                className="p-2 rounded-4xl relative ring-1 flex items-center bg-[#088c9392] gap-2"
              >
                {/* Foto Profil */}
                <img
                  src={
                    comment.user?.profile_photo
                      ? `http://localhost:8000/storage/${comment.user.profile_photo}`
                      : "http://localhost:8000/storage/profile_photos/default.jpg"
                  }
                  alt="Avatar"
                  className="w-9 h-9  rounded-full object-cover border"
                />
                {index < comments.length - 1 && (
                  <hr className="mt-4 border-t border-gray-300" />
                )}

                {/* Nama dan isi komentar */}
                <div className="">
                  <strong className="font-semibold">
                    {comment.user?.username || "Anonim"}
                  </strong>
                  <p>{comment.content}</p>
                  <small className="text-gray-300">
                    {new Date(comment.created_at).toLocaleString("id-ID")}
                  </small>
                </div>

                {comment.user_id.toString() === userId && (
                  <button
                    onClick={() => toggleDeleteOption(comment.id)}
                    className="absolute right-2 text-white hover:text-gray-300"
                  >
                    <FaEllipsisV />
                  </button>
                )}

                {showDeleteOption === comment.id &&
                  comment.user_id.toString() === userId && (
                    <div className="absolute right-5 bg-white border shadow-md p-1 rounded">
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        Hapus Komentar
                      </button>
                    </div>
                  )}
              </div>
            ))}

            {/* Tombol untuk membuka modal jika komentar lebih dari 10 */}
            {comments.length > 6 && (
              <button
                onClick={() => setShowModal(true)}
                className="mt-2 text-sm text-blue-400 px-3 py-1"
              >
                Lihat Semua Komentar ({comments.length})
              </button>
            )}
          </div>

          {/* FORM INPUT KOMENTAR */}
          <form onSubmit={handleCommentSubmit} className="relative mt-4">
            <div className="relative bg-white text-black h-14 rounded-4xl flex items-center">
              <input
                type="text"
                className="w-full p-2 pl-3 pr-10 focus:outline-none"
                placeholder="Tambahkan komentar..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 text-gray-600 hover:text-gray-800"
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
          {notification && (
            <div className="fixed top-5 right-5 bg-red-600 text-white p-3 rounded-lg shadow-lg">
              {notification}
              <button
                onClick={() => setNotification(null)}
                className="ml-2 text-1xl font-bold"
              >
              </button>
            </div>
          )}
        </div>

        {/* MODAL UNTUK MENAMPILKAN SEMUA KOMENTAR */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl transform scale-100 transition-all">
              {/* Header Modal */}
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-lg font-semibold">Semua Komentar</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  ✖
                </button>
              </div>

              {/* Daftar Komentar */}
              <div className="max-h-80 overflow-y-auto mt-4 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {comments.slice(0, 6).map((comment, index) => (
              <div
                key={index}
                className="p-2 rounded-4xl relative ring-1 flex items-center bg-[#088c9392] gap-2"
              >
                {/* Foto Profil */}
                <img
                  src={
                    comment.user?.profile_photo
                      ? `http://localhost:8000/storage/${comment.user.profile_photo}`
                      : "http://localhost:8000/storage/profile_photos/default.jpg"
                  }
                  alt="Avatar"
                  className="w-9 h-9  rounded-full object-cover border"
                />
                {index < comments.length - 1 && (
                  <hr className="mt-4 border-t border-gray-300" />
                )}

                {/* Nama dan isi komentar */}
                <div className="">
                  <strong className="font-semibold">
                    {comment.user?.username || "Anonim"}
                  </strong>
                  <p>{comment.content}</p>
                  <small className="text-gray-300">
                    {new Date(comment.created_at).toLocaleString("id-ID")}
                  </small>
                </div>

                {comment.user_id.toString() === userId && (
                  <button
                    onClick={() => toggleDeleteOption(comment.id)}
                    className="absolute right-2 text-white hover:text-gray-300"
                  >
                    <FaEllipsisV />
                  </button>
                )}

                {showDeleteOption === comment.id &&
                  comment.user_id.toString() === userId && (
                    <div className="absolute right-5 bg-white border shadow-md p-1 rounded">
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        Hapus Komentar
                      </button>
                    </div>
                  )}
              </div>
            ))}
              </div>

              {/* Tombol Tutup */}
              <button
                onClick={() => setShowModal(false)}
                className="mt-5 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryDetail;
