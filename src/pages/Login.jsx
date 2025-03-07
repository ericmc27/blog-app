import React from "react";
import { login } from "../apis";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = React.useState({ email: "", password: "" });
  const [loginError, setLoginError] = React.useState(false)

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const handleOnClick = (e) => {
    if(loginError){
      setLoginError(false)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await login(loginData);

    if(response.status === 401){
      setLoginError(true)
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1
        style={{ fontFamily: "Permanent Marker" }}
        className="text-5xl text-purple-700"
      >
        F r i e n d l i e s
      </h1>

      <h3>Blog Together, Grow Together</h3>

      <form
        onSubmit={handleFormSubmit}
        style={{ height: "452px", width: "405px" }}
        className="flex flex-col items-center shadow-2xl rounded-sm p-4 bg-white mt-auto mb-auto"
      >
        <img style={{ height: "65px" }} className="mb-10" src="/friends.png" />

        <label htmlFor="email" className="text-2xl mb-1.5">
          EMAIL
        </label>

        <input
          id="email"
          style={{ height: "35px", marginBottom: "20px" }}
          className={`border rounded w-80 focus:outline-purple-700 p-1.5 ${loginError && "border-red-500 outline-none"}`}
          type="email"
          value={loginData.email}
          onChange={handleInputChange}
          onClick={handleOnClick}
          required
        />

        <label htmlFor="password" className="text-2xl mb-1.5">
          PASSWORD
        </label>

        <input
          id="password"
          style={{ height: "35px" }}
          className={`border rounded w-80 focus:outline-purple-700 p-1.5 ${loginError && "border-red-500 outline-none"}`}
          type="password"
          value={loginData.password}
          onChange={handleInputChange}
          onClick={handleOnClick}
          required
        />

        <Link
          style={{ margin: "15px 190px 20px 0px" }}
          className="text-blue-500"
        >
          Forgot password?
        </Link>

        <button
          className="border cursor-pointer h-10 w-20 hover:bg-purple-700 hover:text-white"
          type="submit"
        >
          LOGIN
        </button>

        <label style={{ margin: "15px 0px 0px 0px" }}>
          Don't have an account?{" "}
          <Link className="text-blue-500" to={"/signup"}>
            Signup now
          </Link>
        </label>
      </form>
    </div>
  );
};

export default Login;
