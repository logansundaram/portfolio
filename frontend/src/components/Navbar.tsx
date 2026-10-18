import { NavLink } from "react-router";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "border-amber-500 border-b-1 hover:text-amber-500"
    : "hover:text-amber-500";

export const Navbar = () => {
  return (
    <nav className="text-zinc-300 flex gap-6 md:gap-12 px-12 md:px-25 pt-12 md:pt-25 whitespace-nowrap text-sm md:text-base">
      <NavLink to="/" end className={linkClass}>
        [ about ]
      </NavLink>
      <NavLink to="/work" className={linkClass}>
        [ work ]
      </NavLink>
      <NavLink to="/notes" className={linkClass}>
        [ notes ]
      </NavLink>
    </nav>
  );
};
