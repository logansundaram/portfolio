import { NavLink } from "react-router";

export const Navbar = () => {
  return (
    <div className="text-white flex gap-12 p-25 fixed">
      <NavLink to="/" className="hover:text-amber-500">
        [ about ]
      </NavLink>
      <NavLink to="/work" className="hover:text-amber-500">
        [ work ]
      </NavLink>
      <NavLink to="/notes" className="hover:text-amber-500">
        [ notes ]
      </NavLink>
    </div>
  );
};
