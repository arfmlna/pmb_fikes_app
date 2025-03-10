import React from 'react'

export default function EditUser() {
  return (
    <section className='flex w-full items-center justify-center'>
        <div className='xl:max-w-7xl mx-auto w-full bg-white'>
            <section className='flex flex-col w-full gap-10 justify-center p-10'>
                <h1 className='text-lg md:text-2xl lg:text-4xl font-bold'>Update your profile</h1>
                <div className='flex flex-col justify-center items-start gap-4'>
                    <label>Username</label>
                    <input></input>
                    <button>Change</button>
                </div>
                <div className='flex flex-col justify-center items-start gap-4'>
                    <label>New Password</label>
                    <input></input>
                    <button>Change</button>
                </div>
                <div className='flex flex-col justify-center items-start gap-4'>
                    <label>New Email</label>
                    <input></input>
                    <button>Change</button>
                </div>
                <button>Delete account</button>
            </section>
        </div>
    </section>
  )
}
