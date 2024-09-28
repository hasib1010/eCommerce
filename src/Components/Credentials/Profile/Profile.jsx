import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import SkeletonLoader from './SkeletonLoader';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false); // New state for update animation

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const response = await fetch(`http://localhost:3000/users/${user.uid}`);
                    if (!response.ok) throw new Error('Failed to fetch user data');
                    const matchedUser = await response.json();
                    setUserData(matchedUser);
                    setFormData({
                        firstName: matchedUser.firstName || '',
                        lastName: matchedUser.lastName || '',
                        email: matchedUser.email || '',
                        age: matchedUser.age || '',
                    });
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchUserData();
    }, [user]);

    const handleEdit = () => setIsEditing(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setProfilePicture(file);
        } else {
            setError('Please upload a valid image file.');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            age: userData.age || '',
        });
        setProfilePicture(null);
    };

    const handleUpdate = async () => {
        setIsUpdating(true); // Start updating animation
        try {
            let updatedData = { ...formData };

            if (profilePicture) {
                const imageUrl = await handleImageUpload(profilePicture);
                updatedData.profilePicture = imageUrl;
            }

            const response = await fetch(`http://localhost:3000/users/${userData.uid}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error('Failed to update user data');
            const updatedUser = await response.json();
            setUserData(updatedUser);

            await updateProfile(user, {
                displayName: `${formData.firstName} ${formData.lastName}`,
                photoURL: updatedData.profilePicture || user.photoURL,
            });

            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsUpdating(false); // Stop updating animation
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_API_KEY', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Image upload failed');

        const result = await response.json();
        return result.data.url;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
                <SkeletonLoader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-start lg:min-h-screen lg:pt-20 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex flex-col items-center">
                    <img
                        alt={user.displayName}
                        src={userData.profilePicture || 'default-avatar.png'}
                        className="rounded-full h-32 w-32 mb-4 border-4 border-blue-500 shadow-md"
                    />
                    <h2 className="text-3xl font-bold text-blue-600 mb-2">{user.displayName}</h2>
                    {isEditing ? (
                        <div className="space-y-4 w-full">
                            <input
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <input
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="mt-4"
                            />
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={handleUpdate}
                                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                                >
                                    Update Profile
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 w-full">
                            <p className="text-gray-600">Email: {userData.email}</p>
                            <p className="text-gray-600">Age: {userData.age !== null ? userData.age : 'N/A'}</p>
                            <p className="text-gray-600">UID: {userData.uid}</p>
                            <p className="text-gray-600">Total Orders: {userData.orders.length}</p>
                            <p className="text-gray-600">Total Wishlist Items: {userData.wishList.length}</p>
                            <button
                                onClick={handleEdit}
                                className="mt-4 border border-gray-300 rounded px-4 py-2 hover:bg-gray-200 transition"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
