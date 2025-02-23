import React from "react";
import { Link } from "react-router-dom";

export const GalleryCardShow = ({ data }) => {
  try {
    const formattedDate = new Date(data.created_at).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, ' / ');

    return (
      <Link to={`/detail_gallery/${data.id}`} className="flex w-full h-[360px] text-white bg-[#016A70] shadow-lg rounded-xl hover:scale-102 transition-transform duration-300">
        <section className="flex-none w-1/2 h-full">
          <img
            src={`http://localhost:8000/storage/${data.image}`}
            alt="gambar"
            className="object-cover w-full h-full rounded-l-lg"
            onError={(e) => { e.target.src = "http://localhost:8000/storage/default.jpg"; }}
          />
        </section>
        <section className="flex flex-col justify-between p-6 w-1/2">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold leading-tight" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {data.title}
            </h2>
            <p className="text-sm opacity-80" style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {data.description}
            </p>
          </div>
          <div className="flex flex-col space-y-1 bg-[#088C93] p-3 rounded-2xl text-sm opacity-80 mt-6">
            <p>
              Diunggah oleh:{" "}
              <span className="font-bold">
                {data.user?.username || "Unknown"}
              </span>
            </p>
            <p>{formattedDate}</p>
          </div>
        </section>
      </Link>
    );
  } catch (error) {
    console.log(error);
  }
};
