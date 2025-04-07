import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid2X2, Image, Calendar, Settings } from "lucide-react";
import Logo from "../components/Logo";
import { FaSignOutAlt } from "react-icons/fa";
import '../components/sidebar.css';
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    const confirmed = window.confirm("Apakah kamu yakin ingin logout?");
    if (confirmed) {
      localStorage.removeItem("sanctum_token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_role");
      setUser(null);
      navigate("/login");
    }
  };

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

  return (
    <aside className="sticky top-0 flex flex-col w-[300px] h-screen bg-white shadow-right">
      <section className="flex justify-center py-6">
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

      <div className="flex-1 overflow-y-auto space-y-6 px-2 pb-4">
        <div className="bg-[#016A70] text-white rounded-xl p-4">
          {loading ? (
            <p className="font-semibold text-[20px]">Memuat...</p>
          ) : (
            <p className="font-semibold text-[20px]">
              Selamat datang, {user ? user.name : "Admin"}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          {[
            { to: "/profil", icon: <Grid2X2 />, text: "Profil" },
            { to: "/Gallery", icon: <Image />, text: "Album" },
            { to: "/acara", icon: <Calendar />, text: "Acara" },
            ...(user && user.name !== "Guest"
              ? [{ to: "/setting", icon: <Settings />, text: "Pengaturan" }]
              : []),
          ].map(({ to, icon, text }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center space-x-4 shadow-lg border border-gray-200 rounded-xl p-3
        ${
          location.pathname === to
            ? "bg-[#016A70] text-white"
            : "text-black hover:bg-[#016A70] hover:text-white"
        }`}
            >
              {icon}
              <p className="text-[15px]">{text}</p>
            </Link>
          ))}

          {user && user.name !== "Guest" && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-6 space-x-6 shadow-lg border border-gray-200 rounded-xl p-3 text-black hover:bg-red-600 hover:text-white transition-colors"
            >
              <FaSignOutAlt /> Log Out
            </button>
          )}
        </div>
      </div>

      <section className="flex space-x-2 items-center mt-auto text-white bg-[#016A70] p-10 rounded-t-4xl">
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
