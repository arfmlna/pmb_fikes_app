'use client'
import {useState} from 'react'
import DarkMode from "./components/darkMode/darkMode";
import Item from "./components/item/item";
import Loading from "./components/loading/Loading";
// import { metadata } from "./layout";

export default function Home() {
  // meta data
  // metadata.title = "webku | home"

  // load
  const [count, setCount] = useState(true)
  setTimeout(() => {
    setCount(false)
  }, [5000])
  return (
    <div>
      { (count) ? 
      <Loading />
      :
      <div className="flex justify-center items-center w-screen h-screen shadow">
        <h1 className='text-7xl uppercase font-extrabold bg-gradient-to-l from-cyan-500 to-green-500 text-transparent bg-clip-text animate-spin'>Selamat Ngoding</h1>
      </div>
      }
    </div>
  );
}
 