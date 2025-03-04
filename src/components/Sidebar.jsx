import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid2X2, Image, Calendar, Settings } from "lucide-react";
import Logo from "../components/Logo";

export const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

 

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("sanctum_token");

    if (token) {
      fetch("http://localhost:8000/api/check", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            name: data.user?.name || "Guest",
            username: data.user?.username || "-",
            id: data.user?.id || "-",
            profile_photo_url:
              data.user?.profile_photo_url ||
              "http://localhost:8000/storage/profile_photos/default.jpg",
          });
        })
        .catch((error) => console.error("Error fetching user:", error))
        .finally(() => setLoading(false));
    } else {
      setUser({
        name: "Guest",
        username: "-",
        profile_photo_url:
          "http://localhost:8000/storage/profile_photos/default.jpg",
      });
      setLoading(false);
    }
  }, []);

  const navItems = [
    { path: "/Profil", icon: <Grid2X2 />, label: "Profil" },
    { path: "/gallery", icon: <Image />, label: "Album" },
    { path: "/acara", icon: <Calendar />, label: "Acara" },
    { path: "/setting", icon: <Settings />, label: "Pengaturan" },
  ];

  return (
    <aside className="sticky top-0 flex flex-col space-y-6 shadow-2xl w-[300px] py-12 h-screen bg-white">
      <section className="flex justify-center">
        <div className="flex">
          <Logo />
          <div className="px-2 py-3">
            <p className="text-green-600 font-bold text-[15px] leading-tight">Portal.Kegiatan</p>
            <p className="font-bold text-[11px] leading-2">TPQ.Darul.Ulum</p>
          </div>
        </div>
      </section>

      <section className="px-2">
        <div className="bg-[#016A70] text-white rounded-xl p-4">
          {loading ? (
            <p className="font-semibold text-[20px]">Memuat...</p>
          ) : (
            <p className="font-semibold text-[20px]">Selamat datang, {user ? user.name : "Admin"}</p>
          )}
        </div>
      </section>

      <section className="px-2 flex flex-col space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-4 text-black shadow-lg border border-gray-200 rounded-xl p-3 hover:bg-[#016A70] hover:text-white transition-all ${
              location.pathname === item.path ? "bg-[#016A70] text-white" : ""
            }`}
          >
            {item.icon}
            <p className="text-[15px]">{item.label}</p>
          </Link>
        ))}
      </section>

      <section className="flex space-x-2 items-center h-full text-white bg-[#016A70] p-10 rounded-t-4xl">
        {user && user.name !== "Guest" ? (
          <>
            <img
              src={user.profile_photo_url}
              alt="User"
              className="object-cover w-12 h-12 rounded-full ring-1"
            />
            <div className="flex flex-col leading-4">
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="ml-auto bg-[#016A70] border border-solid border-white text-white py-2 px-15 rounded-lg font-semibold hover:bg-gray-200 hover:text-[#016A70]"
          >
            Login
          </Link>
        )}
      </section>
    </aside>
  );
};