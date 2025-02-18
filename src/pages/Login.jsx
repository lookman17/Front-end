import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { client } from "../components/axios";
import logo from "../assets/Logo-Tpq.png";
import { Link } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      };

      console.log("Login Data:", data);
      const res = await client.post("/api/login", JSON.stringify(data));
      const responseData = JSON.parse(res.data);

      console.log("Response Data:", responseData);
      if (typeof responseData === "object" && responseData !== null) {
        console.log("Valid responseData:", responseData);

        if (responseData.token) {
          alert("Login success");

          window.localStorage.setItem("sanctum_token", responseData.token);
          const checkRes = await client.get("/api/check", {
            headers: {
              Authorization: `Bearer ${responseData.token}`,
            },
          });

          const checkResponseData = checkRes.data;

          console.log("Full Check Response Data:", checkResponseData);

          // Tambahkan log untuk memastikan data user benar
          console.log("Check Response Data User:", checkResponseData.user);
          console.log("Check Response Data User ID:", checkResponseData.user?.id);

          if (checkResponseData.user && checkResponseData.user.id) {
            const userId = checkResponseData.user.id;
            console.log("User ID to be stored:", userId);

            // Menyimpan user_id di local storage
            window.localStorage.setItem("user_id", userId);
            console.log("User ID stored in local storage:", userId);

            // Periksa apakah user_id tersimpan di local storage
            const storedUserId = window.localStorage.getItem("user_id");
            console.log("Retrieved User ID from local storage:", storedUserId);

            if (storedUserId === String(userId)) {
              alert("User ID successfully stored in local storage: " + storedUserId);
            } else {
              alert("Failed to store User ID in local storage");
            }

            window.localStorage.setItem("user", JSON.stringify(checkResponseData.user));
          } else {
            console.log("User ID not found in checkResponseData.user");
          }

          // Arahkan ke dashboard
          navigate("/Dashboard");
        } else {
          alert(responseData.message || "Login failed");
        }
      } else {
        console.log("Invalid responseData format:", responseData);
        alert("Login failed: Invalid response data format");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(
          "Axios Error:",
          error.response?.data?.message || "Login failed"
        );
        alert(error.response?.data?.message || "Login failed");
      } else {
        console.log("Unexpected Error:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex p-8 justify-center shadow-2xl items-center min-h-screen text-[#088C93] bg-[#016A70]">
      <div className="flex rounded-xl">
        <div className="flex space-y-8 py flex-1 p-10 w-[600px] rounded-l-2xl bg-[#088C93]">
          <form
            className="flex flex-col text-black space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="h-20 mb-10 text-3xl font-semibold text-white">
              <h1>Sign in</h1>
            </div>
            <div className="py-12 space-y-5">
              <div className="wave-group-login w-full space-y-2">
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="w-full input border-1 border-black rounded-md p-2"
                  autoComplete="off"
                />
                <span className="bar"></span>
                <label className="label">
                  <span
                    className="label-char text-white"
                    style={{ "--index": 0 }}
                  >
                    U
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 1 }}
                  >
                    s
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 2 }}
                  >
                    e
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 3 }}
                  >
                    r
                  </span>
                </label>
              </div>
              <div className="wave-group-login w-full space-y-2 h-28 relative">
                <input
                  required
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  className="w-full input border-1 border-black rounded-md p-2 pr-10"
                  autoComplete="off"
                />
                <span className="bar"></span>
                <label className="label">
                  <span
                    className="label-char text-white"
                    style={{ "--index": 0 }}
                  >
                    P
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 1 }}
                  >
                    a
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 2 }}
                  >
                    s
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 3 }}
                  >
                    s
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 4 }}
                  >
                    w
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 5 }}
                  >
                    o
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 6 }}
                  >
                    r
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 7 }}
                  >
                    d
                  </span>
                </label>
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                className="mt-6 inline-flex w-full h-10 text-[#088C93] rounded-lg items-center justify-center text-center bg-white"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1 bg-white rounded-r-2xl p-24 text-[#088C93]">
          <h1 className="font-semibold text-4xl text-center">Hey There</h1>
          <section className="mt-6 text-center">
            <h5 className="text-lg">Don't have an account?</h5>
            <h5 className="text-lg">Let's make an account!</h5>
            <div className="mt-6">
              <img src={logo} alt="Logo" className="w-32 h-32 mx-auto" />
            </div>
            <p className="mt-4 text-[#02b0b9]">Have an account?</p>
            <Link
              to="/register"
              className="mt-6 inline-flex w-48 h-10 border border-[#088C93] rounded-lg items-center justify-center text-center hover:bg-[#088C93] hover:text-white transition duration-300"
            >
              Sign up
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
