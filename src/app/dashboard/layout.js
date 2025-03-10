import NavbarComponent from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavbarComponent/>
        {children}
      </body>
    </html>
  );
}
