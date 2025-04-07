import santri1 from "../assets/santri-1.jpeg";
import santri2 from "../assets/santri-2.jpeg";
import santri3 from "../assets/santri-3.jpeg";
import logo from "../assets/Logo-Tpq.png";
import { client } from "../components/axios";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import PencapaianCard from "../components/PencapaianCard";

const Beranda = () => {
  const [pencapaian, setPencapaian] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pencapaian.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(pencapaian.length / itemsPerPage);
  

  const fetchData = async () => {
    try {
      const res = await client.get("/api/profil");
      console.log("Full API Response:", res.data);
      const data = Array.isArray(res.data.data) ? res.data.data : [];

      console.log("Parsed Contents:", data);
      setPencapaian(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching data:", error.message);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col m-12 pb-12">

      <div className="flex justify-center items-center w-full mt-12">
        <div className=" p-10 bg-white shadow-2xl rounded-4xl w-1/2 text-center">
          <p className=" text-3xl font-semibold">Profil</p>
          <p className=" text-3xl font-semibold">TPQ Darul Ulum</p>
        </div>
      </div>

      <div className="flex justify-center items-center w-full mt-12">
        <div className="bg-[#016A70] p-20 rounded-4xl shadow-2xl w-[800px] text-center">
          <p className="text-white text-3xl font-semibold">
            TPQ Darul Ulum berdiri pada tanggal 2015, di TPQ ini metode
            pembelajarannya adalah Qiraati, dan TPQ ini yang pertama kali
            menggunakan metode Qiraati di Bokor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full mt-8">
        <div className="p-0 rounded-2xl bg-[#016A70] text-center">
          <img
            src={santri1}
            alt="Card 1 Image Top"
            className="w-full h-48 object-cover rounded-2xl"
          />
          <h2 className="text-xl mt-[-20px] bg-white rounded-full px-4 inline-block">
            Diniyah
          </h2>
          <div className="p-6">
            <p className="text-white">
              Santri di tingkat Iqro memulai perjalanan untuk menghafal
              Al-Quran.
            </p>
          </div>
        </div>

        <div className="p-0 rounded-2xl bg-[#016A70] drop-shadow-lg text-center scale-110">
          <img
            src={santri2}
            alt="Card 2 Image Top"
            className="w-full h-48 object-cover rounded-2xl"
          />
          <h2 className="text-xl mt-[-40px] bg-white rounded-full px-4 inline-block">
            Qiroati
          </h2>
          <div className="p-6">
            <p className="text-white">
              Santri di tingkat Qiroati akan memperdalam bacaan Al-Quran dengan
              tajwid yang benar.
            </p>
          </div>
        </div>

        <div className="p-0 rounded-2xl bg-[#016A70] drop-shadow-lg text-center">
          <img
            src={santri3}
            alt="Card 3 Image Top"
            className="w-full h-48 object-cover rounded-2xl"
          />
          <h2 className="text-xl mt-[-20px] bg-white rounded-full px-4 inline-block">
            Sanawiyah
          </h2>
          <div className="p-6">
            <p className="text-white">
              Santri di tingkat Sanawiyah sudah memahami dan mengamalkan
              Al-Quran dengan baik.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-12 py-10">
        <div className="w-1/2 bg-[#088C93] flex items-center justify-center p-24 rounded-l-2xl drop-shadow-lg">
          <img
            src={logo}
            alt="Santri Image"
            className="w-56 h-56 object-cover rounded-2xl"
          />
        </div>
        <div className="w-1/2 bg-white p-8 rounded-r-2xl drop-shadow-lg text-[#016A70]">
          <p className="text-2xl font-semibold">Deskripsi Santri</p>
          <p className="mt-4">
            Santri adalah seorang pelajar dalam pendidikan Islam yang menempuh
            pendidikan di pesantren. Mereka mempelajari berbagai disiplin ilmu
            agama seperti fiqih, tafsir, hadits, dan lainnya dengan tujuan
            meningkatkan pemahaman dan mengamalkan ajaran Islam dalam kehidupan
            sehari-hari.
          </p>
        </div>
      </div>

      <div className="bg-[#016A70] p-2 rounded-4xl relative">
        <div className="text-center py-16 text-white font-bold text-3xl">
          Pencapaian TPQ Darul Ulum
        </div>

        <div className="grid grid-cols-3 gap-2">
        {currentItems.length > 0 &&
  currentItems.map((item, index) => (
    <PencapaianCard key={index} item={item} />
))}

        </div>
        <div className="flex justify-center items-center mt-4 space-x-2">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    className="px-3 py-1 bg-white text-[#016A70] font-semibold rounded hover:bg-gray-200"
    disabled={currentPage === 1}
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 font-semibold rounded ${
        currentPage === i + 1
          ? "bg-white text-[#016A70]"
          : "bg-gray-200 text-[#016A70]"
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    className="px-3 py-1 bg-white text-[#016A70] font-semibold rounded hover:bg-gray-200"
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>

      </div>

      <div className="mt-12 w-full bg-[#016A70] p-10 rounded-4xl">
        <p className="text-center text-3xl font-bold text-white mb-8">
          Lokasi TPQ Darul Ulum
        </p>
        <div className="bg-white p-6 rounded-2xl text-center">
          <a
            href="https://maps.app.goo.gl/JL7eD1sUKzFcZNTz9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            Jl. Bokor
          </a>
          <div className="mt-4">
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3950.946190287213!2d112.7362595750072!3d-8.004486492021488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMDAnMTYuMiJTIDExMsKwNDQnMTkuOCJF!5e0!3m2!1sen!2sid!4v1740319589424!5m2!1sen!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
