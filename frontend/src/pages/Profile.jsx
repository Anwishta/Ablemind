import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login"); // Redirect if no token
                    return;
                }

                const { data } = await axios.get("http://localhost:8000/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(data);
            } catch (err) {
                setError("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || "User"}</p>
            <button 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;
