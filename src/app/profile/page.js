'use client'
import EditUser from '../components/EditUser';
import NavbarComponent from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';
// import { metadata } from "./layout";

export default function Profile() {
  // meta data
  // metadata.title = "webku | home"

  // load
  return (
    <>
      <NavbarComponent/>
      <>
        <h1 className='flex justify-center items-center h-screen w-full text-white'>Profile</h1>
        <EditUser/>
      </>
    </>
  );
}
 