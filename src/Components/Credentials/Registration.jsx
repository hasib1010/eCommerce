import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const Registration = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const userCredential = await createUser(data.email, data.password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: `${data.firstName} ${data.lastName}` });

            // Prepare user data for backend
            const userData = {
                uid: user.uid,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                age: data.age,
                createdAt: new Date(),
            };

            // Post user data to backend
            const response = await fetch('http://localhost:3000/users', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, ${errorData.message}`);
            } 
            navigate('/userDashboard'); 
        } catch (error) {
            console.error("Error registering user:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Register</h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xl font-semibold text-gray-800">First Name</label>
                            <input
                                className="w-full h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                {...register("firstName", {
                                    required: "First name is required",
                                    maxLength: {
                                        value: 20,
                                        message: "First name cannot exceed 20 characters"
                                    }
                                })}
                            />
                            {errors?.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="text-xl font-semibold text-gray-800">Last Name</label>
                            <input
                                className="w-full h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                {...register("lastName", {
                                    required: "Last name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Alphabetical characters only"
                                    }
                                })}
                            />
                            {errors?.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <label className="text-xl font-semibold text-gray-800">Age</label>
                    <input
                        className="w-full h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        type="number"
                        {...register("age", {
                            min: {
                                value: 12,
                                message: "You must be older than 12"
                            },
                            max: {
                                value: 99,
                                message: "You must be younger than 99"
                            },
                            required: "Age is required"
                        })}
                    />
                    {errors.age && <p className="text-red-500">{errors.age.message}</p>}

                    <label className="text-xl font-semibold text-gray-800">Email</label>
                    <input
                        className="w-full h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered email does not match email format"
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <label className="text-xl font-semibold text-gray-800">Password</label>
                    <input
                        className="w-full h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long"
                            }
                        })}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <button
                        className="w-full h-12 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        type="submit"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-700">Already have an account?</p>
                    <Link to="/login">
                        <button className="mt-2 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-green-400 transition-all">
                            Go to Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Registration;
