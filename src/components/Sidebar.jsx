import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cog, Grid2X2, Grid2X2Plus } from "lucide-react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sanctum_token");
    navigate("/login");
  };

  useEffect(() => {
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
          if (data.user) {
            setUser({
              name: data.user.name,
              username: data.user.username,
              id: data.user.id,
              profile_photo_url:
                data.user.profile_photo_url ||
                "http://localhost:8000/storage/profil_photos/default.jpg",
            });
          } else {
            setUser({ name: "Guest", username: "-", profile_photo_url: "http://localhost:8000/storage/default.jpg" });
          }
        })
        .catch(() => {
          setUser({ name: "Guest", username: "-", profile_photo_url: "http://localhost:8000/storage/default.jpg" });
        });
    } else {
      setUser({ name: "Guest", username: "-", profile_photo_url: "http://localhost:8000/storage/default.jpg" });
    }
  }, []);

  return (
    <aside className="sticky top-0 flex flex-col space-y-6 shadow-2xl w-[250px] py-12 h-screen">
      <section className="flex justify-center">
        <div className="flex">
          <Logo />
          <div className="px-2 py-3">
            <p className="text-green-600 font-bold text-[15px] leading-tight">
              Portal.Kegiatan
            </p>
            <p className="font-bold text-[11px] leading-2">TPQ.Darul.Ulum</p>
          </div>
        </div>
      </section>

      <section className="flex px-2 flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="bg-[#016A70] text-white rounded-xl p-4">
            <p className="font-semibold text-[20px]">
              Selamat datang, {user ? user.name : "Admin"}
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Link to="/Dashboard" className="flex items-center space-x-4 text-black shadow-lg border border-gray-200 rounded-xl p-3 hover:bg-[#016A70] hover:text-white">
            <Grid2X2 />
            <p className="text-[15px]">Profil</p>
          </Link>
          <Link to="/gallery/admin" className="flex items-center space-x-4 text-black shadow-lg border border-gray-200 rounded-xl p-3 hover:bg-[#016A70] hover:text-white">
            <Grid2X2Plus />
            <p className="text-[15px]">Gallery</p>
          </Link>
          <Link to="/event/admin" className="flex items-center space-x-4 text-black shadow-lg border border-gray-200 rounded-xl p-3 hover:bg-[#016A70] hover:text-white">
            <Cog />
            <p className="text-[15px]">Events</p>
          </Link>
          <Link to="/setting/admin" className="flex items-center space-x-4 text-black shadow-lg border border-gray-200 rounded-xl p-3 hover:bg-[#016A70] hover:text-white">
            <Cog />
            <p className="text-[15px]">Settings</p>
          </Link>
        </div>
      </section>

      <section className="flex space-x-3 items-center h-full text-white bg-[#016A70] p-10 rounded-t-3xl">
        <div>
          <img src={user ? user.profile_photo_url : "http://localhost:8000/storage/default.jpg"} alt="User" className="object-cover w-12 h-12 rounded-lg" />
        </div>
        <div className="flex flex-col leading-4">
          <p>{user ? user.name : "Guest"}</p>
          <p>{user ? user.username : "-"}</p>
          <p>{user ? user.id:"-"}</p>
        </div>
        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
          Logout
        </button>
      </section>
    </aside>
  );
};
