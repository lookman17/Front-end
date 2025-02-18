import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

const GalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [galleryData, setGalleryData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/content/${id}`);
        const result = await response.json();
        if (response.ok) {
          setGalleryData(result);
        } else {
          setError(result.message || "Failed to fetch data");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-12 p-6 rounded-lg flex flex-col md:flex-row gap-8">
      {/* Container Kiri: Gambar dan Deskripsi */}
      <div className="md:w-2/3 p-4 bg-gray-50 drop-shadow-lg rounded-[20px]">
        <img
          src={galleryData.image ? galleryData.image : `http://localhost:8000/storage/${galleryData.image}`}
          alt={galleryData.title}
          className="w-full h-96 object-cover rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{galleryData.title}</h1>
        <p className="text-gray-700 mt-2">{galleryData.description}</p>
      </div>

      {/* Container Kanan: Komentar */}
      <div className="w-full max-w-md p-5 bg-[#016A70] rounded-[20px] text-black flex flex-col">
        <div className="flex-grow space-y-2">
          {comments.length > 0 ? (
            comments.slice(0, 5).map((comment, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                {comment}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada komentar</p>
          )}
        </div>

        {/* Tombol untuk melihat semua komentar */}
        {comments.length > 5 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 text-white underline"
          >
            Lihat Semua Komentar
          </button>
        )}

        {/* Input Komentar Tetap di Bawah */}
        <form onSubmit={handleCommentSubmit} className="relative mt-4">
          <div className="relative bg-white text-black h-10 rounded-4xl flex items-center">
            <input
              type="text"
              className="w-full p-2 pl-3 pr-10 focus:outline-none"
              placeholder="Tambahkan komentar..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="absolute right-3 text-gray-600 hover:text-gray-800">
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>

      {/* Modal untuk menampilkan semua komentar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full max-h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Semua Komentar</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-red-500"
              >
                Tutup
              </button>
            </div>
            <div className="flex-grow space-y-2 overflow-y-auto">
              {comments.map((comment, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded">
                  {comment}
                </div>
              ))}
            </div>
            {/* Input Komentar di Modal */}
            <form onSubmit={handleCommentSubmit} className="relative mt-4">
              <div className="relative bg-white text-black h-10 rounded-4xl flex items-center">
                <input
                  type="text"
                  className="w-full p-2 pl-3 pr-10 focus:outline-none"
                  placeholder="Tambahkan komentar..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" className="absolute right-3 text-gray-600 hover:text-gray-800">
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetail;
