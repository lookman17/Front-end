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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      };

      const res = await client.post("/api/login", JSON.stringify(data));
      const responseData = res.data;

      if (responseData.token) {
        window.localStorage.setItem("sanctum_token", responseData.token);

        const checkRes = await client.get("/api/check", {
          headers: { Authorization: `Bearer ${responseData.token}` },
        });

        const checkResponseData = checkRes.data;
        if (checkResponseData.user?.id) {
          window.localStorage.setItem("user_id", checkResponseData.user.id);
          window.localStorage.setItem(
            "user",
            JSON.stringify(checkResponseData.user)
          );

          // Efek loading sebelum berpindah ke dashboard
          setTimeout(() => {
            setIsLoading(false);
            navigate("/Dashboard");
          }, 2000); 
        }
      } else {
        alert(responseData.message || "Login failed");
        setIsLoading(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex p-8 justify-center shadow-2xl items-center min-h-screen text-[#088C93] bg-[#016A70] relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#016A70] z-50 opacity-90 transition-opacity duration-500">
          <img src={logo} alt="Loading" className="w-40 h-40 animate-pulse" />
        </div>
      )}

      <div
        className={`flex rounded-xl ${
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }`}
      >
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
                  <span
                    className="label-char text-white"
                    style={{ "--index": 4 }}
                  >
                    n
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 5 }}
                  >
                    a
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 6 }}
                  >
                    m
                  </span>
                  <span
                    className="label-char text-white"
                    style={{ "--index": 7 }}
                  >
                    e
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
