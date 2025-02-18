import { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../components/axios";
import { GalleryCardShow } from "../components/GalleryCardShow";

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const res = await client.get("/api/content");
      setContents(JSON.parse(res.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();

    // Polling every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const filteredContents = contents.filter((Gallery) =>
    Gallery.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col space-y-2 m-12 pb-12">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p className="">
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
            <h2 className="font-bold text-4xl">Hi, Ferdy</h2>
            <p>Ready to start your day with some content?</p>
          </div>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filteredContents.map((Gallery, index) => (
              <GalleryCardShow key={index} data={Gallery} />
            ))}
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default ContentList;
