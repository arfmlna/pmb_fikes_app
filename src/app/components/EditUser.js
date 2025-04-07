import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert } from "./Alert";
import { useRouter } from "next/navigation";

export default function EditUser() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [token, setToken] = useState(null); // State for token

    const router = useRouter()

    // Fetch token after component mounts
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, []);

    const handleChangePassword = async () => {
        try {
            const response = await axios.put(
                "/api/resetpass",
                {
                    old_password: oldPassword,
                    new_password: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Alert('Info', 'Password changed successfully', 'success', 'OK!')
            console.log("Password changed successfully:", response.data);
        } catch (error) {
            Alert('Info', 'Error changing password', 'error', 'OK!')
            console.error("Error changing password:", error.response?.data || error.message);
        }
    };

    const handleChangeEmail = async () => {
        try {
            const response = await axios.put(
                "/api/change_email",
                {
                    old_email: oldEmail,
                    new_email: newEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Alert('Info', 'Email changed successfully', 'success', 'OK!')
            console.log("Email changed successfully:", response.data);
        } catch (error) {
            Alert('Info', 'Error changing email', 'error', 'OK!')
            console.error("Error changing email:", error.response?.data || error.message);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const account = localStorage.getItem('userId')
            const response = await axios.delete(
                `/api/users/${account}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
            Alert('Info', 'Delete account successfully', 'success', 'OK!')
            router.replace('/login')
            console.log("Delete account successfully:", response.data);
        } catch (error) {
            Alert('Info', 'Failed delete account', 'error', 'OK!')
            console.error("Failed delete account:", error.response?.data || error.message);
        }
    }

    return (
        <section className="flex w-full items-center justify-center">
            <div className="xl:max-w-7xl mx-auto w-full bg-white">
                <section className="flex flex-col w-full gap-10 justify-center p-10">
                    <h1 className="text-lg md:text-2xl lg:text-4xl font-bold">Update Your Profile</h1>
                    
                    {/* Change Password Section */}
                    <div className="flex flex-col justify-center items-start gap-4">
                        <h1 className="text-base md:text-lg lg:text-xl font-bold">Change Password</h1>
                        <label>Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Old password"
                            className="border px-3 py-2 rounded-md"
                        />
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                            className="border px-3 py-2 rounded-md"
                        />
                        <button
                            onClick={handleChangePassword}
                            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
                        >
                            Change
                        </button>
                    </div>

                    {/* Change Email Section */}
                    <div className="flex flex-col justify-center items-start gap-4">
                        <h1 className="text-base md:text-lg lg:text-xl font-bold">Change Email</h1>
                        <label>Old Email</label>
                        <input
                            type="email"
                            value={oldEmail}
                            onChange={(e) => setOldEmail(e.target.value)}
                            placeholder="Old email"
                            className="border px-3 py-2 rounded-md"
                        />
                        <label>New Email</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="New email"
                            className="border px-3 py-2 rounded-md"
                        />
                        <button
                            onClick={handleChangeEmail}
                            className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600"
                        >
                            Change
                        </button>
                    </div>

                    {/* Delete Account Section */}
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
                    >
                        Delete Account
                    </button>
                </section>
            </div>
        </section>
    );
}
