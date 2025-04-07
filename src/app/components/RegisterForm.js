"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert } from "./Alert";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') == 'admin') {
                router.push('/dashboard')
            } else if(localStorage.getItem('role') == 'users'){
                router.push('/')
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/register", { name, email, password }, { withCredentials: true });

            console.log("Register successful:", response.data);
            Alert('Info', 'Berhasil Registrasi', 'success', 'OK!')
            router.push("/login")
            // Handle successful login (e.g., redirect or store token in localStorage)
        } catch (err) {
            Alert('Info', 'Gagal Registrasi', 'error', 'OK!')
            setError(err.response?.data?.message || "Register failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-transparent flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full flex gap-5 bg-white max-w-md lg:px-14 lg:py-10 px-10 py-6 rounded-xl flex-col justify-center">
                <h1 className="text-center font-bold text-base md:text-xl lg:text-2xl text-black">Register akun anda</h1>

                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border rounded px-3 py-2"
                        required
                        autoFocus
                        autoComplete="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        className="mt-1 block w-full border rounded px-3 py-2"
                        required
                        autoFocus
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label>Password</label>
                    <input
                        type="password"
                        className="mt-1 block w-full border rounded px-3 py-2"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Link href={"/login"}>Sudah punya akun?</Link>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="flex items-center justify-center mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                        {loading ? "Registering ..." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}
