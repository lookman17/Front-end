import { Suspense, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { client } from "../../components/axios";
import { GalleryCard } from "../../components_admin/GalleryCard";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";

const Gallery = () => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await client.get("/api/content");
      setContents(JSON.parse(res.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(contents);
  }, [contents]);

  const handleDelete = (id) => {
    setContents(contents.filter((content) => content.id !== id));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col space-y-2 m-12 pb-12">
        <h1 className="font-bold text-2xl">Album</h1>
        <p className="">
          <span className="text-green-600">
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </span>{" "}
          /{String(new Date().getDate()).padStart(2, "0")}/{" "}
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
            <p>Content</p>
            <div className="flex space-x-2 text-white">
              <Link
                to="/Create/Gallery"
                className="inline-flex items-center justify-center px-4 py-2 bg-[#016A70] text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-[#014F55]"
              >
                <FaPlus className="mr-2" /> Tambahkan Gallery
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {isLoading ? ( // Show loading message while fetching data
              <div>Loading...</div>
            ) : (
              contents.map((Gallery, index) => (
                <GalleryCard key={index} data={Gallery} onDelete={handleDelete} />
              ))
            )}
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default Gallery;
