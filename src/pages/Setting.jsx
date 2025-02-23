import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { client } from "../components/axios";
import { FaSignOutAlt } from "react-icons/fa";


const Settings = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("sanctum_token");

        if (!token) {
          setUser(null);
          return;
        }

        const res = await client.get("api/check", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const userData = res.data.user || {};
        setUser({
          name: userData.name || "Guest",
          username: userData.username || "-",
          email: userData.email || "-",
          profile_photo_url:
            userData.profile_photo_url ||
            "http://localhost:8000/storage/profile_photos/default.jpg",
        });

        setFormData({
          name: userData.name || "",
          username: userData.username || "",
          email: userData.email || "",
          password: "",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Error:", error.response?.data);
        }
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.put("/update-user", JSON.stringify(formData));
      alert("Pengaturan berhasil diperbarui!");
    } catch (error) {
      console.error("Error:", error.response?.data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sanctum_token");
    localStorage.removeItem("user_id");
    alert("Logout berhasil!");
    window.location.href = "/login";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex flex-col space-y-4 m-12 pb-12">
      <h1 className="font-semibold text-2xl">Pengaturan Akun</h1>
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
      <section className="flex pt-4 gap-x-8">
        <div className="w-1/3 p-4 h-[600px] bg-white shadow-md rounded-2xl text-center">
          <div className="mb-4 flex flex-col items-center justify-center">
            <img
              src={
                user
                  ? user.profile_photo_url
                  : "http://localhost:8000/storage/profile_photos/default.jpg"
              }
              alt="User"
              className="object-cover w-54 h-54 rounded-full ring-1"
            />
            <p className="mt-2 font-medium text-center">
              {user ? user.username : "Guest"}
            </p>
          </div>

          <button
  onClick={handleLogout}
  className="mt-4 px-6 py-2 w-full rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-gray-100 ease-in-out"
>
  <FaSignOutAlt /> Log Out
</button>

        </div>

        <div className="w-2/3 p-10 bg-white rounded-2xl shadow-md">
          <p className="font-semibold text-2xl">Informasi Pribadi</p>
          <form className="space-y-4 py-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium">Nama</label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.username || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.password || ""}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 w-full rounded-md bg-[#016A70] text-white hover:bg-[rgb(33,74,77)]"
            >
              Simpan Pengaturan
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Settings;
