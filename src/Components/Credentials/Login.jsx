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
    const cartItems = location.state?.cartItems || [];
    const total = location.state?.total || 0;
    
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false); 
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true); // Start loading
        try {
            await logIn(data.email, data.password);
            if (cartItems.length > 0) {
                navigate('/checkout', { state: { items: cartItems, total } });
            } else {
                navigate(from, { replace: true });
            }
        } catch (error) {
            setLoginError('Login failed. Please check your email and password.');
            console.error('Login error', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Handle user data and navigate
            // (Similar to your existing code)

            // Check if cartItems exist and navigate accordingly
            if (cartItems.length > 0) {
                navigate('/checkout', { state: { items: cartItems, total } });
            } else {
                navigate(from, { replace: true });
            }
        } catch (error) {
            setLoginError("An error occurred during Google login.");
            console.error('Google login error:', error);
        } finally {
            setLoading(false);  
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
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500 text-lg">{errors.email.message}</p>}

                    <label className="text-xl font-semibold text-gray-800">Password</label>
                    <input
                        className="w-full h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        id="password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p className="text-red-500 text-lg">{errors.password.message}</p>}

                    <button
                        className={`w-full h-12 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={loading}
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
