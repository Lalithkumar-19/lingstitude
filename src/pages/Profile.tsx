import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
    email: string;
    fullName: string;
    phoneNumber?: number;
    profilePic?: string;
    enrolled_batch?: string;
    isStudent?: boolean;
};

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState<User | null>(null);

    const fetchUserProfile = async () => {
        try {
        const token = localStorage.getItem("Usertoken");
        console.log("token",token);

        const response = await axios.get("/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User Profile:", response.data);
        setUser(response.data);
        setUpdatedUser(response.data);
        } catch (error) {
        console.error("Error fetching user profile:", error);
        } finally {
        setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = async () => {
        try {
        const token = localStorage.getItem("Usertoken");
        await axios.put(
            "/api/user/profile/update",
            { ...updatedUser },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(updatedUser);
        setEditing(false);
        } catch (error) {
        console.error("Error updating profile:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-blue-50 py-10">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            <div className="flex items-center space-x-6">
            <img
                src={user?.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <div>
                <h2 className="text-3xl font-bold text-blue-600">{user?.fullName}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-gray-600">Phone: {user?.phoneNumber || "N/A"}</p>
                <p className="text-gray-500 text-sm">
                Enrolled Batch: {user?.enrolled_batch || "Not enrolled"}
                </p>
            </div>
            </div>

            {!editing ? (
            <button
                onClick={() => setEditing(true)}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Edit Profile
            </button>
            ) : (
            <div className="mt-6">
                <input
                type="text"
                name="fullName"
                value={updatedUser?.fullName || ""}
                onChange={handleInputChange}
                className="border w-full rounded-lg p-2 mb-2"
                placeholder="Full Name"
                />
                <input
                type="number"
                name="phoneNumber"
                value={updatedUser?.phoneNumber || ""}
                onChange={handleInputChange}
                className="border w-full rounded-lg p-2 mb-2"
                placeholder="Phone Number"
                />
                <button
                onClick={handleProfileUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                Save Changes
                </button>
                <button
                onClick={() => setEditing(false)}
                className="ml-2 text-gray-600 px-4 py-2"
                >
                Cancel
                </button>
            </div>
            )}
        </div>
        </div>
    );
};

export default Profile;
