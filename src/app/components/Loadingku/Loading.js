'use client'
import Image from "next/image"
import TypeIt from "typeit-react"

export default function Loading() {

    return (
        <div className={`flex flex-col gap-10 z-10 w-full h-[100vh] bg-black items-center justify-center`}>
            <h1 className="text-white text-5xl font-serif italic">
                <TypeIt options={{
                    strings:["Loading..."],
                    speed: 100,
                    loop: true
                }}/>
            </h1>
        </div>
    )
}
