import { AxiosError } from "axios";
import { client } from "../components/axios";
import { GalleryCardShow } from "../components/GalleryCardShow";
import santri1 from "../assets/santri-1.jpeg";
import santri2 from "../assets/santri-2.jpeg";
import santri3 from "../assets/santri-3.jpeg";
import logo from "../assets/Logo-Tpq.png";
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Dashboard = () => {
  const images = [santri1, santri2, santri3 ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="">
        <span className="text-green-600">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </span>{" "}
        /{String(new Date().getDate()).padStart(2, "0")}/{" "}
        <span>
          {new Date().toLocaleDateString("en-US", { month: "long" }).toLowerCase()}
        </span>{" "}
        / {new Date().getFullYear()}
      </p>

      <section className="flex flex-col space-y-8 pt-14 items-center">
        <div className="flex w-[470px] items-center flex-col space-y-4 p-8 rounded-2xl bg-white drop-shadow-lg">
          <p className="text-4xl text-center font-semibold">Checkout our latest news update</p>
        </div>
        <div className="flex flex-col space-y-2 p-24 w-4xl items-center rounded-3xl drop-shadow-lg bg-[#088C93]">
          <p className="text-3xl text-white font-semibold leading-10">
            Ada 3 tingkatan Santri dalam TPQ Darul Ulum, Semakin tinggi tingkatan maka santri semakin menguasai bacaan Al-Quran
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8 w-full">
          <div className="p-0 rounded-2xl bg-[#016A70] text-center">
            <img src={santri1} alt="Card 1 Image Top" className="w-full h-48 object-cover rounded-2xl"/>
            <h2 className="text-xl mt-[-20px] bg-white rounded-full px-4 inline-block">Iqro</h2>
            <div className="p-6">
              <p className="text-white">Santri pertama yang menyelesaikan QS. Yunus ayat 109 akan mendapatkan tiket gratis umroh</p>
            </div>
          </div>
          <div className="p-0 rounded-2xl bg-[#016A70] drop-shadow-lg text-center scale-110">
            <img src={santri2} alt="Card 2 Image Top" className="w-full h-48 object-cover rounded-2xl"/>
            <h2 className="text-xl mt-[-40px] bg-white rounded-full px-4 inline-block">Qiroati</h2>
            <div className="p-6">
              <p className="text-white">Santri pertama yang menyelesaikan QS. Yunus ayat 109 akan mendapatkan tiket gratis umroh</p>
            </div>
          </div>
          <div className="p-0 rounded-2xl bg-[#016A70] drop-shadow-lg text-center">
            <img src={santri3} alt="Card 3 Image Top" className="w-full h-48 object-cover rounded-2xl"/>
            <h2 className="text-xl mt-[-20px] bg-white rounded-full px-4 inline-block">Sanawiyah</h2>
            <div className="p-6">
              <p className="text-white">Santri pertama yang menyelesaikan QS. Yunus ayat 109 akan mendapatkan tiket gratis umroh</p>
            </div>
          </div>
        </div>

        <div className="flex w-full mt-12">
          <div className="w-1/2 bg-[#088C93] flex items-center justify-center p-24 rounded-l-2xl drop-shadow-lg">
            <img src={logo} alt="Santri Image" className="w-56 h-56 object-cover rounded-2xl"/>
          </div>
          <div className="w-1/2 bg-white p-8 rounded-r-2xl drop-shadow-lg text-[#016A70]">
            <p className="text-2xl font-semibold">Deskripsi Santri</p>
            <p className="mt-4">
              Santri adalah seorang pelajar dalam pendidikan Islam yang menempuh pendidikan di pesantren. Mereka mempelajari berbagai disiplin ilmu agama seperti fiqih, tafsir, hadits, dan lainnya dengan tujuan meningkatkan pemahaman dan mengamalkan ajaran Islam dalam kehidupan sehari-hari.
            </p>
          </div>
        </div>

        {/* Scrollable image gallery with enhanced icons */}
        <div className="flex w-full mt-12 items-center bg-[#088C93] rounded-4xl p-4 space-x-14">
          <button onClick={showPreviousImage} className="p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition">
            <FaChevronLeft size={36} className="text-[#016A70]" />
          </button>
          <div className="flex-none w-[650px] h-[450px] rounded-2xl drop-shadow-lg text-center">
            <img src={images[currentIndex]} alt={`Santri Image ${currentIndex + 1}`} className="w-full h-full object-cover rounded-4xl"/>
          </div>
          <button onClick={showNextImage} className="p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition">
            <FaChevronRight size={36} className="text-[#016A70]" />
          </button>
        </div>

      </section>
    </div>
  );
};

export default Dashboard;
