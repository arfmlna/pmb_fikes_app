'use client'
import {useState} from 'react'
import Loading from "./components/loading/Loading";
import LoginForm from './components/LoginForm';
import NavbarComponent from './components/Navbar';
// import { metadata } from "./layout";

export default function Home() {
  // meta data
  // metadata.title = "webku | home"

  // load
  return (
    <>
      <NavbarComponent/>
      <>
        <h1 className='flex justify-center items-center h-screen w-full text-white'>Home</h1>
      </>
    </>
  );
}
 