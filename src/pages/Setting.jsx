import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { client } from "../components/axios";

const Settings = () => {
  const [user, setUser] = useState({});
  const formattedDate = new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(/,/g, " /")
    .toLowerCase();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.get("/user");
        setUser(res.data.user);
        setFormData({
          name: res.data.user.name,
          username: res.data.user.username,
          email: res.data.user.email,
          password: "", // keep password empty initially
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log("Error message:", error.message);
          console.log("Server response:", error.response?.data);
        }
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const res = await client.put("/update-user", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Settings successfully updated!");

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error message:", error.message);
        console.log("Server response:", error.response?.data);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    alert("Logged out successfully!");
  };

  return (
    <div className="flex flex-col space-y-2 m-12 pb-12">
      <h1 className="font-bold text-2xl">Pengaturan Akun</h1>
      <p>
        <span className="text-green-600">{formattedDate}</span>
      </p>

      <section className="flex pt-4 gap-x-8">
        <div className="w-1/3 p-4 h-[600px] bg-white drop-shadow-lg rounded-2xl text-center">
          <div className="mb-4">
            <img src={`http://localhost:8000/storage/${user.profile_photo_path}`} alt="Profile" className="rounded-full w-32 h-32 mx-auto" />
            <p className="mt-2 font-medium">{user.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 inline-flex items-center px-6 py-2 border border-transparent text-sm w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m0-10V7a3 3 0 016 0v1m6 4H7" />
            </svg>
            Log Out
          </button>
        </div>

        <div className="w-2/3 p-10 bg-white rounded-2xl shadow-md">
          <div>
            <p className="font-semibold text-2xl">Personal Information</p>
          </div>
          <form className="space-y-4 py-10" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 ring-1 focus:ring-indigo-500 sm:text-sm"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="mt-1 p-2 block w-full ring-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="mt-1 p-2 block ring-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="mt-1 p-2 block w-full rounded-md ring-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#088C93] w-full text-center hover:bg-[#065e65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Settings;
