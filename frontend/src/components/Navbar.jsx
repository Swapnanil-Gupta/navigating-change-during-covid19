import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 py-4 border-b-2 border-neutral-200">
      <div className="container flex items-center justify-between">
        <ul className="flex items-center gap-x-6 font-semibold">
          <li>
            <NavLink
              end
              to="/app"
              className={({ isActive }) =>
                isActive ? "text-foreground" : "text-foreground/60"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/app/emissions"
              className={({ isActive }) =>
                isActive ? "text-foreground" : "text-foreground/60"
              }
            >
              Emissions
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/app/business-establishments"
              className={({ isActive }) =>
                isActive ? "text-foreground" : "text-foreground/60"
              }
            >
              Business Establishments
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/app/payroll"
              className={({ isActive }) =>
                isActive ? "text-foreground" : "text-foreground/60"
              }
            >
              Payroll
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/app/entrepreneurship"
              className={({ isActive }) =>
                isActive ? "text-foreground" : "text-foreground/60"
              }
            >
              Entrepreneurship
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/app/tax-revenue"
              className={({ isActive }) =>
                isActive ? "text-foreground" : "text-foreground/60"
              }
            >
              Tax Revenue
            </NavLink>
          </li>
        </ul>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
