import { NavLink } from "react-router";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "border-amber-500 border-b-1 hover:text-amber-500"
    : "hover:text-amber-500";

export const Navbar = () => {
  return (
    <div className="text-zinc-300 flex gap-6 md:gap-12 p-12 md:p-25 md:fixed whitespace-nowrap text-sm md:text-base">
      <NavLink to="/" end className={linkClass}>
        [ about ]
      </NavLink>
      <NavLink to="/work" className={linkClass}>
        [ work ]
      </NavLink>
      <NavLink to="/notes" className={linkClass}>
        [ notes ]
      </NavLink>
    </div>
  );
};
