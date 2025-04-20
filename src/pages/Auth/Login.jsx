import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../util/AuthContext"

const Login = () => {
   
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const { login, currentUser } = useContext(AuthContext);
  useEffect(()=>{
    if(currentUser){
      navigate("/home")
    }
  })

  const handleLogin = (e) => {
    e.preventDefault();
      try {
        login(inputs);
      } catch (error) {
        console.log("error", error)
        alert(error.response.data)
        setErr(error)
      }
  };
    return (
        <div className="flex h-screen">
            {/* Left Panel */}
            <div className="w-1/2 h-full">
                <img
                    src="welovevlt.png"
                    alt="Volunteers"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Panel */}
            <div className="w-1/2 bg-[#CDF4F1] flex flex-col justify-center items-center p-12">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="./logo.PNG"
                        alt="Logo"
                        className="w-40 h-40 object-contain mb-4"
                    />
                    <h1 className="text-4xl font-bold text-gray-800">Login</h1>
                </div>

                {/* Login Form */}
                <div className="w-full max-w-md">
                    <form className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Login now
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            className="text-blue-600 font-semibold cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
