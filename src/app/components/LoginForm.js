"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert } from "./Alert";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (Cookies.get('token')) {
            if (Cookies.get('role') == 'users') {
                router.push('/')
            } else if(Cookies.get('role') != 'users'){
                router.push('/dashboard')
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/login", { email, password }, { withCredentials: true });

            console.log("Login successful:", response.data);
            Cookies.set("user", response.data.user, { expires: 1 })
            Cookies.set("token", response.data.token, { expires: 1 })
            Cookies.set("userId", response.data.id, { expires: 1 })
            Cookies.set("role", response.data.role, { expires: 1 })
            
            Alert('Info', 'Login Successful', 'success', 'OK!')
            // Handle successful login (e.g., redirect or store token in localStorage)
            if (response.data.role === "users") {
                router.replace("/")
            } else {
                router.replace("/dashboard")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            Alert('Info', 'Login Failed', 'error', 'OK!')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-transparent flex justify-center items-center">
            <Image height='600' width='600' alt='' src="/fikesicon.png" className="absolute z-10 size-[70px] top-2 left-2"/>
            <Image height='600' width='600' alt='' src="/umtas.jpg" className=' w-full brightness-50 object-cover object-center h-screen absolute z-0'/>
            <form onSubmit={handleSubmit} className="w-full z-10 flex gap-5 bg-white max-w-md lg:px-14 lg:py-10 px-10 py-6 rounded-xl flex-col justify-center">
                <h1 className="text-center font-bold text-base md:text-xl lg:text-2xl text-black">Masuk ke akun anda</h1>

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

                <Link className="text-black hover:text-blue-500 hover:underline" href={"/register"}>Belum punya akun?</Link>
                
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="flex items-center justify-center mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </div>
            </form>
        </div>
    );
}
