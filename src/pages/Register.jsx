import { useState } from "react";
import { AxiosError } from "axios";
import { client } from "../components/axios";
import logo from "../assets/Logo-Tpq.png";
import { Link, useNavigate } from "react-router";
import "./Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: e.target.elements.name.value,
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      };

      console.log(data);
      const res = await client.post("/api/register", JSON.stringify(data));
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  return (

    <div className="flex p-8 justify-center shadow-2xl items-center min-h-screen text-[#088C93] bg-[#016A70]">
      <div className="flex rounded-xl">
        <div className="flex-1 bg-[#088C93] rounded-l-2xl p-24 text-white">
          <h1 className="font-semibold text-4xl text-center">Hey There</h1>
          <section className="mt-6 text-center">
            <h5 className="text-lg">Don't have an account?</h5>
            <h5 className="text-lg">Let's make an account!</h5>
            <div className="mt-6">
              <img src={logo} alt="Logo" className="w-32 h-32 mx-auto" />
            </div>
            <p className="mt-4 text-[#c7c7c7]">Have an account?</p>
            <Link
              to="/login"
              className="mt-6 inline-flex w-48 h-10 border border-white rounded-lg items-center justify-center text-center hover:bg-white hover:text-[#088C93] transition duration-300"
            >
              Sign in
            </Link>
          </section>
        </div>

        <div className="flex space-y-8 flex-1 p-10 w-[600px] rounded-r-2xl bg-white">
          <form
            className="flex flex-col text-black space-y-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="h-20 mb-10 text-3xl font-semibold text-[#088C93]">
              <h1>Sign Up</h1>
            </div>
            <div className="wave-group w-full space-y-2">
              <input
                required
                type="text"
                name="name"
                id="name"
                className="w-full input border-1 border-black rounded-md p-2"
                autoComplete="off"
              />
              <span className="bar"></span>
              <label className="label">
                <span className="label-char" style={{ "--index": 0 }}>
                  N
                </span>
                <span className="label-char" style={{ "--index": 1 }}>
                  a
                </span>
                <span className="label-char" style={{ "--index": 2 }}>
                  m
                </span>
                <span className="label-char" style={{ "--index": 3 }}>
                  e
                </span>
              </label>
            </div>
            <div className="wave-group w-full space-y-2">
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
                <span className="label-char" style={{ "--index": 0 }}>
                  U
                </span>
                <span className="label-char" style={{ "--index": 1 }}>
                  s
                </span>
                <span className="label-char" style={{ "--index": 2 }}>
                  e
                </span>
                <span className="label-char" style={{ "--index": 3 }}>
                  r
                </span>
                <span className="label-char" style={{ "--index": 4 }}>
                  n
                </span>
                <span className="label-char" style={{ "--index": 5 }}>
                  a
                </span>
                <span className="label-char" style={{ "--index": 6 }}>
                  m
                </span>
                <span className="label-char" style={{ "--index": 7 }}>
                  e
                </span>
              </label>
            </div>
            <div className="wave-group w-full space-y-2 h-28 relative">
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
                <span className="label-char" style={{ "--index": 0 }}>
                  P
                </span>
                <span className="label-char" style={{ "--index": 1 }}>
                  a
                </span>
                <span className="label-char" style={{ "--index": 2 }}>
                  s
                </span>
                <span className="label-char" style={{ "--index": 3 }}>
                  s
                </span>
                <span className="label-char" style={{ "--index": 4 }}>
                  w
                </span>
                <span className="label-char" style={{ "--index": 5 }}>
                  o
                </span>
                <span className="label-char" style={{ "--index": 6 }}>
                  r
                </span>
                <span className="label-char" style={{ "--index": 7 }}>
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
              className="bg-[#088C93] rounded-lg py-2 text-white"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
