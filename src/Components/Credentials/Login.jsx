import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import auth from "../Services/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";  
import { checkEmailInDatabase } from "./checkEmailInDatabase ";

const Login = () => {
    const { logIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true); // Start loading
        try {
            await logIn(data.email, data.password);
            navigate(from, { replace: true });
        } catch (error) {
            setLoginError('Login failed. Please check your email and password.');
            console.error('Login error', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true); // Start loading
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            const uid = user.uid;
            const email = user.email;
            const displayName = user.displayName || 'User';
            const [firstName, lastName] = displayName.split(' ');
    
            const userData = {
                uid,
                firstName: firstName || 'Unknown',
                lastName: lastName || '',
                email,
                age: null,
                createdAt: new Date().toISOString(),
                orders: [],
                wishList: []
            };
    
            const emailExists = await checkEmailInDatabase(email);
    
            if (emailExists) {
                // Instead of showing an error, navigate to the desired page
                navigate(from, { replace: true });
                return;
            }
    
            const response = await fetch('https://e-commerce-server-alpha.vercel.app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to create user:', errorText);
                throw new Error('Failed to create user in the database');
            }
    
            navigate(from, { replace: true });
    
        } catch (error) {     
            if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') { 
                setLoginError('Login was cancelled. Please try again.');
            } else { 
                setLoginError("An error occurred during Google login.");
            }
            console.error('Google login error:', error);
        } finally {
            setLoading(false); // End loading
        }
    };
    
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Login</h1>
                {loginError && <p className="text-red-500 text-lg mb-4">{loginError}</p>}
                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <label className="text-xl font-semibold text-gray-800">Email</label>
                    <input
                        className="w-full h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered email does not match email format"
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-lg">{errors.email.message}</p>}

                    <label className="text-xl font-semibold text-gray-800">Password</label>
                    <input
                        className="w-full h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long"
                            }
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-lg">{errors.password.message}</p>}

                    <button
                        className={`w-full h-12 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-gray-700">Don't have an account?</p>
                        <Link to="/register">
                            <button className="mt-2 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-green-400 transition-all">
                                Register Here
                            </button>
                        </Link>
                    </div>
                </form>
                <button className="flex items-center text-3xl font-bold gap-2 border w-full justify-center mt-5 rounded-lg hover:shadow-lg" onClick={handleGoogle} disabled={loading}>
                    <img className="w-20" src="https://yt3.googleusercontent.com/viNp17XpEF-AwWwOZSj_TvgobO1CGmUUgcTtQoAG40YaYctYMoUqaRup0rTxxxfQvWw3MvhXesw=s900-c-k-c0x00ffffff-no-rj" alt="Google logo" />
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
