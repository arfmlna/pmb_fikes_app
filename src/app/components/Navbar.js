"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function MobileNav({open, setOpen}) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md`}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
                <h1 className="text-xl text-black font-semibold">PMB Fikes</h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-6 py-10 text-lg text-black">
                <p className="cursor-pointer">Shop</p>
                <p className="cursor-pointer">About Us</p>
                <p className="cursor-pointer">Contact</p>
                <p className="flex gap-x-2 cursor-pointer items-center">Furniture</p>
            </div>
        </div>
    )
}

export default function NavbarComponent() {

    const user = localStorage.getItem("users")

    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter()

    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token")

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 400) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        };
        // Attach the event listener
        window.addEventListener("scroll", handleScroll);
        // Remove the event listener on cleanup
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            localStorage.removeItem("role")
            router.refresh()
        } catch (error) {
            console.error("Error while logging out", error)
        }
    }

    return (
        <header className={`fixed z-50 w-full flex justify-center items-center ${isScrolled ? "bg-white bg-opacity-50 backdrop-blur-sm" : "bg-transparent backdrop-blur-0"}`}>
            <div className="xl:max-w-[1280px] w-full">
                <nav className={`flex xl:px-0 lg:px-20 lg:py-10 md:px-14 md:py-7 px-10 py-5 justify-between items-center w-full transition-colors duration-500 ease-out ${isScrolled ? "text-black" : "text-white"}`}>
                    <MobileNav open={open} setOpen={setOpen}/>
                    <h1 className="lg:text-2xl md:text-xl text-lg font-semibold cursor-pointer">PMB Fikes</h1>
                    <ul className="md:flex hidden items-center justify-end gap-5 lg:text-sm text-xs">
                        {role === "users" ? (
                            <>
                                <Link className="cursor-pointer" href={"/profile"}>Profile</Link>
                                <button onClick={() => handleLogout()}>Logout</button>
                            </>
                        ) : role === "admin" ? (
                            <>
                                <Link className="cursor-pointer" href={"/dashboard"}>Dashboard</Link>
                                <Link className="cursor-pointer" href={"/rekap-pendaftaran"}>Rekap Pendaftaran</Link>
                            </>
                        ) : (
                            <>
                                <Link className="cursor-pointer" href={"/login"}>Login</Link>
                                <Link className="cursor-pointer" href={"/register"}>Register</Link>
                            </>
                        )}
                    </ul>
                    <div className="flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {setOpen(!open)}}>
                        <span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5 bg-black" : isScrolled ? "bg-black" : "bg-white"}`}/>
                        <span className={`h-1 w-full rounded-lg transform transition-all duration-300 ease-in-out ${open ? "w-0 h-0" : isScrolled ? "bg-black" : "w-full bg-white"}`}/>
                        <span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5 bg-black" : isScrolled ? "bg-black" : "bg-white"}`}/>
                    </div>
                </nav>
            </div>
        </header>
    )
}