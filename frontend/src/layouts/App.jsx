import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="container py-8">
        <Outlet />
      </div>
    </>
  );
}
