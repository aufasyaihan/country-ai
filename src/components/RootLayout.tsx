import { Outlet } from "react-router";
import Navbar from "./Navbar";

const RootLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;