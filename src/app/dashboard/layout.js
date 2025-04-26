"use client"

import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function RootLayout({ children }) {

  const router = useRouter()
  
      useEffect(() => {
          if (Cookies.get('token')) {
              if (Cookies.get('role') !== 'admin') {
                  router.push('/')
                }
            } else {
                router.push('/')
          }
      })

  return (
    // <html lang="en">
    //   <body
    //     className={`antialiased`}
    //   >
      <Fragment>
        {children}
      </Fragment>
    //   </body>
    // </html>
  );
}
