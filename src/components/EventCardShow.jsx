import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const EventCardShow = ({ data }) => {
  const navigate = useNavigate();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="flex w-full max-w-4xl rounded-xl overflow-hidden shadow-lg bg-[#016A70] hover:shadow-xl transition-transform transform hover:scale-[1.02] m-4">
      {/* Gambar */}
      <div
        className="w-1/3 bg-cover bg-center"
        style={{
          backgroundImage: `url(http://localhost:8000/storage/${data.image || "default.jpg"})`,
          minHeight: "220px",
        }}
      ></div>

      {/* Konten */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => navigate(`/detail/acara/${data.id}`)}
            className="text-2xl font-bold text-white cursor-pointer hover:underline"
          >
            {data.name}
          </h3>
          <p className="text-gray-200 mt-2 text-sm">
            {truncateText(data.description, 200)}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => navigate(`/detail/acara/${data.id}`)}
            className="bg-teal-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-teal-700 transition-colors"
          >
            Baca Selengkapnya →
          </button>

          <div className="flex flex-wrap gap-3 mt-2">
            <span className="bg-yellow-400 text-white px-3 py-1 rounded-md text-sm font-medium">
              {data.status}
            </span>
            <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium">
              📅 {formatDate(data.date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

EventCardShow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    status: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
  }).isRequired,
};

export default EventCardShow;
