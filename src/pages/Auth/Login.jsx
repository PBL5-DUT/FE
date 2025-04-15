import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../user/UserProvider';

const Login = () => {
    const user = useUser(); // Lấy thông tin user từ context
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // ✅ FIXED: Chỉ phụ thuộc vào user.jwt để tránh vòng lặp vô hạn
    useEffect(() => {
        if (user?.jwt) {
            navigate(`/home`);
        }
    }, [user.jwt, navigate]);

    // Hàm gửi yêu cầu đăng nhập
    const sendLoginRequest = () => {
        const reqBody = {
            username: username,
            password: password,
        };

        console.log('Sending login request with:', reqBody);

        fetch('http://localhost:8080/api/v1/auth/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                console.log('Response status:', response.status);
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers]);
                } else {
                    return Promise.reject('Invalid login attempt!');
                }
            })
            .then(([body, _headers]) => {
                console.log('Response body:', body);

                const token = body.token;
                if (token) {
                    user.setJwt(token);
                    localStorage.setItem('token', token);
                    navigate('/home');
                } else {
                    throw new Error('Token not found in response!');
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert("Login failed. Please check your credentials.");
            });
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
                                onChange={(e) => setUsername(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={sendLoginRequest}
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
