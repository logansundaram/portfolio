import { NavLink } from "react-router";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "border-amber-500 border-b-1 hover:text-amber-500"
    : "hover:text-amber-500";

export const Navbar = () => {
  return (
    <div className="text-zinc-300 flex gap-12 p-25 fixed">
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
