import santri1 from "../assets/santri-1.jpeg";
import santri2 from "../assets/santri-2.jpeg";
import santri3 from "../assets/santri-3.jpeg";
import logo from "../assets/Logo-Tpq.png";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Dashboard = () => {
  const images = [santri1, santri2, santri3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
      <h1 className="font-semibold text-2xl">Profil</h1>
      <p>
          <span className="text-green-600">
            {new Date().toLocaleDateString("id-ID", { weekday: "long" })}
          </span>{" "}
          / {String(new Date().getDate()).padStart(2, "0")} /{" "}
          <span>
            {new Date().toLocaleDateString("id-ID", { month: "long" }).toLowerCase()}
          </span>{" "}
          / {new Date().getFullYear()}
        </p>

      <div className="flex justify-center items-center w-full mt-12">
  <div className=" p-10 bg-white shadow-2xl rounded-4xl w-1/2 text-center">
    <p className=" text-3xl font-semibold">Profil</p>
    <p className=" text-3xl font-semibold">TPQ Darul Ulum</p>
  </div>
</div>

<div className="flex justify-center items-center w-full mt-12">
  <div className="bg-[#016A70] p-20 rounded-4xl shadow-2xl w-[800px] text-center">
    <p className="text-white text-3xl font-semibold">
      TPQ Darul Ulum berdiri pada tanggal 2015, di TPQ ini metode pembelajarannya adalah Qiraati,
      dan TPQ ini yang pertama kali menggunakan metode Qiraati di Bokor.
    </p>
  </div>
</div>


      {/* Iqro, Qiroati, Sanawiyah Cards */}
      <div className="grid grid-cols-3 gap-8 w-full mt-8">
        <div className="p-0 rounded-2xl bg-[#016A70] text-center">
          <img
            src={santri1}
            alt="Card 1 Image Top"
            className="w-full h-48 object-cover rounded-2xl"
          />
          <h2 className="text-xl mt-[-20px] bg-white rounded-full px-4 inline-block">
            Iqro
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
              Santri di tingkat Qiroati akan memperdalam bacaan Al-Quran
              dengan tajwid yang benar.
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

      {/* Description Section with Logo */}
      <div className="flex w-full mt-12">
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

      {/* Image Carousel */}
      <div className="flex w-full mt-12 items-center bg-[#088C93] rounded-4xl p-56 relative">
        <img
          src={images[currentIndex]}
          alt={`Santri Image ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-0"
        />
        <button
          onClick={showPreviousImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition z-10"
        >
          <FaChevronLeft size={36} className="text-[#016A70]" />
        </button>
        <button
          onClick={showNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition z-10"
        >
          <FaChevronRight size={36} className="text-[#016A70]" />
        </button>

        <div className="absolute gap-32 bottom-0 left-0 w-full bg-[rgba(0,0,0,0.5)] text-white p-6 rounded-3xl z-10 flex justify-between items-center">
          <div className="flex">
            <p className="text-8xl font-semibold">+200</p>
            <p className="text-4xl">Santri</p>
          </div>
          <div className="flex">
            <p className="text-8xl font-semibold">+200</p>
            <p className="text-4xl">Ustadz dan Ustadzah</p>
          </div>
        </div>
      </div>

      {/* Pencapaian TPQ Darul Ulum Section */}
      <div className="mt-12 w-full bg-[#016A70] p-10 rounded-4xl">
        <p className="text-center text-3xl font-bold text-white mb-8">
          Pencapaian TPQ Darul Ulum
        </p>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-[#F5F5F5] p-6 rounded-2xl text-center">
            <img
              src={santri1}
              alt="Card 1"
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <p className="text-sm text-gray-600">
              usia 3-6 tahun sudah bisa khatam Al-Qur'an
            </p>
          </div>

          <div className="bg-[#F5F5F5] p-6 rounded-2xl text-center">
            <img
              src={santri2}
              alt="Card 2"
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <p className="text-sm text-gray-600">
              Santri usia Balita sudah lintas cabang Malang 2
            </p>
          </div>

          <div className="bg-[#F5F5F5] p-6 rounded-2xl text-center">
            <img
              src={santri3}
              alt="Card 3"
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <p className="text-sm text-gray-600">
              Dalam 8 bulan ada yang menempuh wisuda angkatan pertama
              berjumlah 5 santri
            </p>
          </div>
        </div>
      </div>

      {/* Lokasi TPQ Darul Ulum Section */}
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
  ></iframe>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
