"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import icon from '../fikesicon.png'
import { Alert } from "./Alert";

function MobileNav({ open, setOpen, role, handleLogout }) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md`}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
                <h1 className="text-xl text-black font-semibold">PMB Fikes</h1>
            </div>
            <ol className="flex flex-col items-center justify-center gap-y-6 py-10 text-lg text-black">
            {role === "users" ? (
                <>
                    <Link className="cursor-pointer" href={"/"}>Home</Link>
                    <Link className="cursor-pointer" href={"/profile"}>Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : role === "admin" ? (
                <>
                    <Link className="cursor-pointer" href={"/dashboard"}>Dashboard</Link>
                    <Link className="cursor-pointer" href={"/profile"}>Profile</Link>
                    <Link className="cursor-pointer" href={"/rekap-pendaftaran"}>Rekap Pendaftaran</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link className="cursor-pointer" href={"/login"}>Login</Link>
                    <Link className="cursor-pointer" href={"/register"}>Register</Link>
                </>
            )}
            </ol>
        </div>
    );
}

export default function NavbarComponent() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [role, setRole] = useState(null); // State for role
    const router = useRouter();

    // Fetch localStorage values after rendering
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedRole = localStorage.getItem("role");
            setRole(storedRole);
        }
    }, []);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Logout function
    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
            Alert('Logout', 'Aku Pergi🏃‍♂️‍➡️', 'success', 'OK!')
            router.push("/login"); // Redirect to login after logout
        } catch (error) {
            Alert('Logout', 'Aku Kembali🏃‍♂️‍➡️', 'error', 'OK!')
            console.error("Error while logging out", error);
        }
    };

    return (
        <header className={`fixed z-50 w-full flex justify-center items-center ${isScrolled ? "bg-white bg-opacity-50 backdrop-blur-sm" : "bg-transparent backdrop-blur-0"}`}>
            <div className="xl:max-w-[1280px] w-full">
                <nav className={`flex xl:px-0 lg:px-20 lg:py-10 md:px-14 md:py-7 px-10 py-5 justify-between items-center w-full transition-colors duration-500 ease-out ${isScrolled ? "text-black" : "text-white"}`}>
                    <MobileNav open={open} setOpen={setOpen} role={role} handleLogout={handleLogout} />
                    <div className="flex h-full items-center">
                        <h1 className="lg:text-2xl md:text-xl text-lg font-semibold cursor-pointer">PMB Fikes</h1>
                        <Image src={icon} width={70} height={70} alt="icon"/>
                    </div>
                    <ul className="md:flex hidden items-center justify-end gap-5 lg:text-sm text-xs">
                        {role === "users" ? (
                            <>
                                <Link className="cursor-pointer" href={"/"}>Home</Link>
                                <Link className="cursor-pointer" href={"/profile"}>Profile</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        ) : role === "admin" ? (
                            <>
                                <Link className="cursor-pointer" href={"/dashboard"}>Dashboard</Link>
                                <Link className="cursor-pointer" href={"/profile"}>Profile</Link>
                                <Link className="cursor-pointer" href={"/rekap-pendaftaran"}>Rekap Pendaftaran</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link className="cursor-pointer" href={"/login"}>Login</Link>
                                <Link className="cursor-pointer" href={"/register"}>Register</Link>
                            </>
                        )}
                    </ul>
                    <div className="flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => setOpen(!open)}>
                        <span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5 bg-black" : isScrolled ? "bg-black" : "bg-white"}`} />
                        <span className={`h-1 w-full rounded-lg transform transition-all duration-300 ease-in-out ${open ? "w-0 h-0" : isScrolled ? "bg-black" : "w-full bg-white"}`} />
                        <span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5 bg-black" : isScrolled ? "bg-black" : "bg-white"}`} />
                    </div>
                </nav>
            </div>
        </header>
    );
}
