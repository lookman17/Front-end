import React, { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../components/axios";
import { Search } from "lucide-react";
import { GalleryCardShow } from "../components/GalleryCardShow";
import "./Gallery.css";

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await client.get("/api/content");
      console.log("Full API Response:", res.data);
      const data = Array.isArray(res.data) ? res.data : [];
      console.log("Parsed Contents:", data);
      setContents(data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching data:", error.message);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredContents = contents.filter((Gallery) =>
    Gallery.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col space-y-2 m-12 pb-12">
        <h1 className="font-bold text-2xl">Album</h1>
        <p>
          <span className="text-green-600">
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </span>{" "}
          / {String(new Date().getDate()).padStart(2, "0")} /{" "}
          <span>
            {new Date()
              .toLocaleDateString("en-US", { month: "long" })
              .toLowerCase()}
          </span>{" "}
          / {new Date().getFullYear()}
        </p>

        <section className="flex flex-col space-y-8 pt-4">
          <div className="flex flex-col space-y-4 p-16 rounded-2xl text-white bg-[#016A70]">
            <h2 className="font-bold text-4xl">Hi, Santri</h2>
            <p>Berikut ini adalah album atau kegiatan TPQ</p>
          </div>
          <div className="flex items-center p-2 w-64 border rounded-lg shadow-lg bg-white ml-auto">
            <Search size={20} className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow focus:outline-none"
            />
          </div>

          {/* Grid 2 kolom untuk tampilan kanan-kiri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </section>
            ) : filteredContents.length > 0 ? (
              filteredContents.map((content) => (
                <GalleryCardShow key={content.id} data={content} />
              ))
            ) : (
              <div className="text-gray-500">No contents available.</div>
            )}
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default ContentList;
