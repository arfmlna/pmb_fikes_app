import "./globals.css";
import {Jost} from "next/font/google"

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
    <html lang="en">
      <head>
        <link rel="icon" href="./fikesicon.png" sizes="any" />
      </head>
      <body
        className={`${jostVariable.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
