"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import icon from '../fikesicon.png'
import { Alert } from "./Alert";
import Cookies from "js-cookie";
import parseData from "./method/GetCookies";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Dropdown, DropdownItem } from "flowbite-react";

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
                    <Link className="cursor-pointer" href={"/dashboard/rekap-pendaftaran"}>Rekap Pendaftaran</Link>
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
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [role, setRole] = useState(null); // State for role
    const router = useRouter();
    
    const data = parseData
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const currentRoute = usePathname() 

    // Fetch localStorage values after rendering
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedRole = Cookies.get("role");
            setRole(storedRole);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
    
            if (currentScrollPos > 400) {
                if (currentScrollPos > prevScrollPos) {
                    // Scrolling down
                    setVisible(false);
                } else {
                    // Scrolling up
                    setVisible(true);
                }
            } else {
                // If above 400px, always show
                setVisible(true);
            }
    
            setPrevScrollPos(currentScrollPos);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);
    

    // Logout function
    const handleLogout = async () => {
        try {
            Cookies.remove("token");
            Cookies.remove("role");
            Cookies.remove("userId");
            Cookies.remove("user");
            Alert('Logout', 'Aku Pergi🏃‍♂️‍➡️', 'success', 'OK!')
            
            router.push("/login") // Redirect to login after logout
        } catch (error) {
            Alert('Logout', 'Aku Kembali🏃‍♂️‍➡️', 'error', 'OK!')
            console.error("Error while logging out", error);
        }
    };

    return (
        <>
            <header className={`fixed z-50 w-full flex justify-center items-center bg-white border-b border-b-gray-300 transition-all duration-300 ease-out transform ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
                <div className="xl:max-w-[1280px] w-full">
                    <nav className={`flex p-4 justify-between items-center w-full transition-colors duration-500 ease-out text-black`}>
                        <MobileNav open={open} setOpen={setOpen} role={role} handleLogout={handleLogout} />
                        <div className="flex h-full items-center">
                            <Image priority src={icon} width={70} height={70} alt="icon"/>
                            <h1 className="lg:text-2xl md:text-xl text-lg font-bold cursor-pointer tracking-wide">PMB FIKES</h1>
                        </div>
                        {role !== "users" ? null : (
                            <ul className="md:flex hidden items-center justify-end gap-5 lg:text-sm text-xs">
                                <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/"}>Beranda</Link>
                                <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/pendaftaran" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/pendaftaran"}>Pendaftaran</Link>
                                {/* <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/daftar" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/daftar"}>Daftar</Link> */}
                                <button className={`pb-1 flex justify-center items-center gap-1.5 ${currentRoute === "/program-studi" || currentRoute === "/pengumuman" ? "font-bold" : "font-normal"}`} onClick={() => setIsDropdownOpen((prev) => !prev)}><p className="text-black">Informasi</p>{isDropdownOpen ? <BsChevronUp/> : <BsChevronDown/>}</button>
                                {isDropdownOpen && (
                                    <div className="absolute top-20 -mr-32 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-50 animate-fadeIn">
                                        <button
                                            onClick={() => {
                                            setIsDropdownOpen(false);
                                            router.push("/program-studi");
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Program Studi
                                        </button>
                                        <button
                                            onClick={() => {
                                            setIsDropdownOpen(false);
                                            router.push("/pengumuman");
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Informasi & Pengumuman
                                        </button>
                                    </div>
                                )}
                            </ul>
                        )}
                        <ul className="md:flex hidden items-center justify-end gap-5 lg:text-sm text-xs">
                            {role === "users" ? (
                                <>
                                    <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/profile" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/profile"}>Profile</Link>
                                    <button className="bg-red-500 text-white p-4 rounded-lg" onClick={handleLogout}>Keluar</button>
                                </>
                            ) : role === "admin" ? (
                                <>
                                    <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/dashboard" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/dashboard"}>Dashboard</Link>
                                    <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/profile" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/profile"}>Profile</Link>
                                    <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/dashboard/rekap-pendaftaran" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/dashboard/rekap-pendaftaran"}>Rekap Pendaftaran</Link>
                                    <Dropdown label="Kelola Pengguna" inline dismissOnClick={false}>
                                        <DropdownItem>
                                            <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/kelola-users" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/kelola-users"}>Kelola Users</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/kelola-admin" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/kelola-admin"}>Kelola Admin</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/kelola-seleksi" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/kelola-seleksi"}>Kelola Seleksi</Link>
                                        </DropdownItem>
                                    </Dropdown>
                                    <Dropdown label="Prodi & Angkatan" inline dismissOnClick={false}>
                                        <DropdownItem>
                                            <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/dashboard/prodi" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/prodi"}>Prodi</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link className={`cursor-pointer tracking-wide pb-1 ${currentRoute === "/dashboard/angkatan" ? "font-bold border-b-black border-b-2" : "hover:border-b-black hover:border-b transition-all ease-out duration-150 font-normal"}`} href={"/angkatan"}>Angkatan</Link>
                                        </DropdownItem>
                                    </Dropdown>
                                    {/* <button onClick={handleLogout}>Logout</button> */}
                                    <button className="bg-red-500 text-white p-4 rounded-lg" onClick={handleLogout}>Keluar</button>
                                </>
                            ) : (
                                <>
                                    <Link className="cursor-pointer px-6 py-4 hover:border-none hover:bg-blue-900 hover:text-white transition-all duration-150 ease-out tracking-wide border-black rounded-lg border-2" href={"/login"}>Masuk</Link>
                                </>
                            )}
                        </ul>
                        <div className="flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => setOpen(!open)}>
                            <span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5 bg-black" : visible ? "bg-black" : "bg-white"}`} />
                            <span className={`h-1 w-full rounded-lg transform transition-all duration-300 ease-in-out ${open ? "w-0 h-0" : visible ? "bg-black" : "w-full bg-white"}`} />
                            <span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5 bg-black" : visible ? "bg-black" : "bg-white"}`} />
                        </div>
                    </nav>
                </div>
            </header>
            <div className="h-24" /> {/* Spacer that gives room below the fixed navbar */}
        </>
    );
}
