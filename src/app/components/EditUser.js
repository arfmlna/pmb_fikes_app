import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert } from "./Alert";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { CgUser } from "react-icons/cg";
import LoginLogs from "./LoginLogs";
import parseData from "./method/GetCookies";

export default function EditUser() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [token, setToken] = useState(null); // State for token
    // const [getDokumen, setDocument] = useState({})

    const router = useRouter()

    const account = Cookies.get('userId')

    // Fetch token after component mounts
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = Cookies.get("token");
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
            const response = await axios.delete(
                `/api/users/${account}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            Cookies.remove("token");
            Cookies.remove("id");
            Cookies.remove("role");
            Alert('Info', 'Delete account successfully', 'success', 'OK!')
            router.replace('/login')
            console.log("Delete account successfully:", response.data);
        } catch (error) {
            Alert('Info', 'Failed delete account', 'error', 'OK!')
            console.error("Failed delete account:", error.response?.data || error.message);
        }
    }

    // const getProfile = async () => {
    //     try {
    //         const token = Cookies.get('token')
    //         const response = await axios.get(`/api/document/${account}`,
    //             {
    //                 headers: {
    //                     'Authorization' : `Bearer ${token}`
    //                 },
    //                 withCredentials: true
    //             },
    //         )

    //         const doc = response.data.body
    //         setDocument(doc)
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }

    // useEffect(() => {
    //     getProfile()
    // }, [getProfile])

    // console.log(getDokumen?.[0]?.foto ?? 'Foto tidak tersedia');
    return (
        <section className="flex w-full items-center py-10 px-4 md:px-10 justify-center">
            <div className="xl:max-w-7xl mx-auto w-full bg-white">
                <div className="flex flex-col gap-5 w-full items-center">
                    <div className="bg-white flex flex-col w-full items-center gap-4 p-4 border border-gray-300 rounded-lg">
                        <CgUser className="text-black size-40"/>
                        <table className="ml-16">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><p className="px-3 text-base md:text-lg lg:text-xl capitalize">Username</p></td>
                                    <td>:</td>
                                    <td><p className="px-3 text-base md:text-lg lg:text-xl capitalize">{parseData.name}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="px-3 text-base md:text-lg lg:text-xl">Email</p></td>
                                    <td>:</td>
                                    <td><p className="px-3 text-base md:text-lg lg:text-xl">{parseData.email}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="px-3 text-base md:text-lg lg:text-xl">Role</p></td>
                                    <td>:</td>
                                    <td><p className="px-3 text-base md:text-lg lg:text-xl">{parseData.role}</p></td>
                                </tr>
                                {parseData.user_id && (
                                    <tr>
                                        <td><p className="px-3 text-base md:text-lg lg:text-xl">NIM</p></td>
                                        <td>:</td>
                                        <td><p className="px-3 text-base md:text-lg lg:text-xl">{parseData.user_id}</p></td>
                                    </tr>
                                )}
                                {parseData.nama_prodi && (
                                    <tr>
                                        <td><p className="px-3 text-base md:text-lg lg:text-xl">Prodi</p></td>
                                        <td>:</td>
                                        <td><p className="px-3 text-base md:text-lg lg:text-xl">{parseData.nama_prodi}</p></td>
                                    </tr>
                                )}
                                {parseData.tahun_angkatan && (
                                    <tr>
                                        <td><p className="px-3 text-base md:text-lg lg:text-xl">Angkatan</p></td>
                                        <td>:</td>
                                        <td><p className="px-3 text-base md:text-lg lg:text-xl">{parseData.tahun_angkatan}</p></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <section className="flex flex-col w-full gap-10 justify-center p-10">
                        <h1 className="text-lg md:text-2xl lg:text-4xl font-bold">Perbarui profil anda</h1>
                        
                        {/* Change Password Section */}
                        <div className="flex flex-col w-full justify-center items-start gap-4">
                            <h1 className="text-base md:text-lg lg:text-xl font-bold">Ganti password</h1>
                            <label>Password lama</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Password lama"
                                className="border px-3 py-2 rounded-md w-full"
                            />
                            <label>Password baru</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Password baru"
                                className="border px-3 py-2 rounded-md w-full"
                            />
                            <button
                                onClick={handleChangePassword}
                                className="bg-blue-500 flex justify-center items-center text-white px-5 py-2 rounded-md hover:bg-blue-600"
                            >
                                Ganti
                            </button>
                        </div>

                        {/* Change Email Section */}
                        <div className="flex flex-col justify-center items-start gap-4">
                            <h1 className="text-base md:text-lg lg:text-xl font-bold">Ganti email</h1>
                            <label>Email lama</label>
                            <input
                                type="email"
                                value={oldEmail}
                                onChange={(e) => setOldEmail(e.target.value)}
                                placeholder="Email lama"
                                className="border px-3 py-2 rounded-md w-full"
                            />
                            <label>Email baru</label>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Email baru"
                                className="border px-3 py-2 rounded-md w-full"
                            />
                            <button
                                onClick={handleChangeEmail}
                                className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600"
                            >
                                Ganti
                            </button>
                        </div>

                        <LoginLogs/>

                        {/* Delete Account Section */}
                        <button
                            onClick={handleDeleteAccount}
                            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
                        >
                            Hapus akun
                        </button>
                    </section>
                </div>
            </div>
        </section>
    );
}
