import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [formError, setFormError] = useState({});

    function handleValidation() {
        let err = {};

        if (fullName === '') {
            err.fullName = 'Full name is required!';
        }

        if (email === '') {
            err.email = 'Email is required!';
        } else {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(email)) {
                err.email = 'Invalid Email!';
            }
        }

        if (username === '') {
            err.username = 'Username is required!';
        }

        if (password === '') {
            err.password = 'Password is required!';
        }

        setFormError({ ...err });
        return Object.keys(err).length < 1;
    }

    function createUser(e) {
        e.preventDefault();
        const reqBody = {
            username,
            password,
            email,
            fullName,
            phone,
            address,
        };

        const isValid = handleValidation();

        if (isValid) {
            axios
                .post(`/api/v1/auth/register`, reqBody, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    navigate(`/`);
                })
                .catch((error) => {
                    console.log(error.response?.data || error.message);
                });
        } else {
            alert('Invalid Form');
        }
    }

    return (
        <div className="flex h-screen bg-[#CDF4F1]">
            {/* Left Panel */}
            <div className="w-1/2 flex justify-center items-center">
                <div className="text-center">
                    <img
                        src="logo.PNG"
                        alt="Volunteer Logo"
                        className="w-100 mx-auto mb-4"
                    />
                    <h1 className="text-4xl font-bold text-gray-800">Volunteer</h1>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 flex justify-center items-center">
                <div className="w-full max-w-md h-[97%] bg-white p-8 shadow-lg rounded-lg flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Sign Up
                    </h1>
                    <form onSubmit={createUser} className="space-y-4">
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full py-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="John Doe"
                            />
                            <span className="text-red-500 text-sm">{formError.fullName}</span>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full py-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="example@email.com"
                            />
                            <span className="text-red-500 text-sm">{formError.email}</span>
                        </div>
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
                                className="w-full py-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Username"
                            />
                            <span className="text-red-500 text-sm">{formError.username}</span>
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
                                className="w-full py-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Password"
                            />
                            <span className="text-red-500 text-sm">{formError.password}</span>
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full py-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0123456789"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full py-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123 Street, City"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Create
                        </button>
                        <p className="text-center mt-1 text-gray-600">
                            Already have an account?{' '}
                            <span
                                onClick={() => navigate('/login')}
                                className="text-blue-600 font-semibold cursor-pointer"
                            >
                                Log in
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;