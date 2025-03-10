import axios from 'axios'
import React, { useState } from 'react'

export default function EditUser() {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [oldEmail, setOldEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")

    const token = localStorage.getItem("token")

    const handleChangePassword = async () => {
        try {
            const response = await axios.put("/api/resetpass", {
                old_password: oldPassword,
                new_password: newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChangeEmail = async () => {
        try {
            const response = await axios.put("/api/change_email", {
                old_email: oldEmail,
                new_email: newEmail
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <section className='flex w-full items-center justify-center'>
        <div className='xl:max-w-7xl mx-auto w-full bg-white'>
            <section className='flex flex-col w-full gap-10 justify-center p-10'>
                <h1 className='text-lg md:text-2xl lg:text-4xl font-bold'>Update your profile</h1>
                <div className='flex flex-col justify-center items-start gap-4'>
                    <h1 className='text-base md:text-lg lg:text-xl font-bold'>Change password</h1>
                    <label>Old Password</label>
                    <input value={oldPassword} onChange={(text) => setOldPassword(text.target.value)} placeholder='Old password'/>
                    <label>New Password</label>
                    <input value={newPassword} onChange={(text) => setNewPassword(text.target.value)} placeholder='New password'/>
                    <input/>
                    <button onClick={() => handleChangePassword()}>Change</button>
                </div>
                <div className='flex flex-col justify-center items-start gap-4'>
                    <h1 className='text-base md:text-lg lg:text-xl font-bold'>Change email</h1>
                    <label>Old Email</label>
                    <input value={oldEmail} onChange={(text) => setOldEmail(text.target.value)} placeholder='Old email'/>
                    <label>New Email</label>
                    <input value={newEmail} onChange={(text) => setNewEmail(text.target.value)} placeholder='New email'/>
                    <button onClick={() => handleChangeEmail()}>Change</button>
                </div>
                <button>Delete account</button>
            </section>
        </div>
    </section>
  )
}
