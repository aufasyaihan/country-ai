import { Outlet } from "react-router";
import Navbar from "./Navbar";

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;