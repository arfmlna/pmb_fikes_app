'use client'
import TypeIt from "typeit-react"

export default function Loading() {
    
    return (
        <div className={`flex z-10 w-full h-[100vh] bg-black items-center justify-center`}>
            <h1 className="text-white text-5xl font-serif"><TypeIt options={{
                strings:["Loading..."],
                speed: 100,
                loop: true
            }}/></h1>
        </div>
    )
}
