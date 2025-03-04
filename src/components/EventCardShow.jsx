import React from "react";
import { useNavigate } from "react-router-dom";

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
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="card flex flex-row w-[900px] border text-white p-3 border-gray-300 m-2 rounded-lg shadow-md bg-[#088C93] transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="content w-2/5 p-5 flex flex-col justify-between">
        <a href="#" onClick={() => navigate(`/detail/acara/${data.id}`)}>
          <h3 className="title text-2xl font-bold mb-2">{data.name}</h3>
        </a>
        <p className="desc text-base mb-4">{truncateText(data.description, 200)}</p>
      </div>
      <div className="flex flex-col w-3/5">
        <div
          className="image h-40 rounded-2xl bg-cover bg-center transition-opacity hover:opacity-90"
          style={{
            backgroundImage: `url(http://localhost:8000/storage/${data.image || "default.jpg"})`,
          }}
        ></div>
        <div className="flex flex-col justify-around items-center p-4 w-full">
          <a
            className="action bg-[#016A70] p-2 rounded-4xl w-full text-center border border-white font-semibold mb-2 transition-colors hover:bg-[#024a4d]"
            href="#"
            onClick={() => navigate(`/detail/acara/${data.id}`)}
          >
            Baca Selengkapnya <span aria-hidden="true">→</span>
          </a>
          <div className="flex flex-row justify-between items-center w-full">
            <p className="status bg-yellow-300 text-white p-1 w-60 rounded-md font-semibold text-center">
              {data.status}
            </p>
            <p className="date ml-4 p-1 rounded-4xl w-60 bg-green-600 text-white text-center">
              📅 {formatDate(data.date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardShow;
