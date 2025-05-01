import { ThemeConfig } from "flowbite-react";
import "./globals.css";
import {Jost} from "next/font/google"
import "primereact/resources/themes/tailwind-light/theme.css";
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from "primereact/api";

const jostVariable = Jost({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  display: "swap",
  subsets: ["latin"]
})

export const metadata = {
  title: "PMB Fikes",
  description: "Web PMB Fikes App",
};

export default function RootLayout({ children }) {
  return (
    <PrimeReactProvider value={{ unstyled: false }}>
      <html lang="en">
        <ThemeConfig dark={false} />
        <head>
          <link rel="icon" href="./fikesicon.png" sizes="any" />
        </head>
        <body
          className={`${jostVariable.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </PrimeReactProvider>
    // <html lang="en">
    //   <head>
    //     <link rel="icon" href="./fikesicon.png" sizes="any" />
    //   </head>
    //   <body
    //     className={`${jostVariable.className} bg-gray-50 antialiased`}
    //   >
    //     {children}
    //   </body>
    // </html>
  );
}
