import { useState, useEffect, useRef } from "react";
import { AxiosError } from "axios";
import { client, multiPartClient } from "../components/axios";
import { FaSignOutAlt } from "react-icons/fa";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profile_photo: null,
  });

  const fileInputRef = useRef(null);

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
          profile_photo: null,
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
      const token = localStorage.getItem("sanctum_token");
  
      const formDataToSend = new FormData();
      formDataToSend.append("_method", "PATCH");
  
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== "" && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
  
      const response = await multiPartClient.post(
        "/api/update-user",
        formDataToSend,
        { headers }
      );
  
      alert("Pengaturan berhasil diperbarui!");
  
      // Perbarui state user dengan data terbaru dari respons API
      setUser((prevUser) => ({
        ...prevUser,
        name: response.data.name || prevUser.name,
        username: response.data.username || prevUser.username,
        email: response.data.email || prevUser.email,
        profile_photo_url: formData.profile_photo
          ? URL.createObjectURL(formData.profile_photo)
          : response.data.profile_photo_url || prevUser.profile_photo_url,
      }));
  
      // Reset hanya password agar tidak terkirim ulang
      setFormData((prevFormData) => ({
        ...prevFormData,
        password: "",
      }));
  
      // Auto refresh halaman setelah update berhasil
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.response?.data?.message || "Terjadi kesalahan."}`);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("sanctum_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    
    alert("Logout berhasil!");
    window.location.href = "/";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, profile_photo: file }));
      setUser((prevUser) => ({
        ...prevUser,
        profile_photo_url: URL.createObjectURL(file),
      }));
    }
  };
  

  return (
    <div className="flex flex-col space-y-4 m-12 pb-12">
      
      <section className="flex pt-4 gap-x-8">
        <div className="w-1/3 p-4 h-[600px] bg-white shadow-md rounded-2xl text-center">
          <div className="mb-4 flex flex-col items-center justify-center relative group">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <img
                src={
                  user
                    ? user.profile_photo_url
                    : "http://localhost:8000/storage/profile_photos/default.jpg"
                }
                alt="User"
                className="object-cover w-54 h-54 rounded-full ring-1 group-hover:opacity-70"
                onClick={handleProfilePhotoClick}
              />
            </label>
            <input
              type="file"
              id="photo-upload"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfilePhotoChange}
            />
            <p className="mt-2 font-medium text-center">
              {user ? user.username : "Guest"}
            </p>
          </div>
          {/*<button
            onClick={handleLogout}
            className="mt-4 px-6 py-2 w-full rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-gray-100 ease-in-out"
          >
            <FaSignOutAlt /> Log Out
          </button>*/}
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
