import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark px-4 shadow-sm">
      <span className="navbar-brand text-white fw-bold">Paumo's Dictionary</span>
      <div className="navbar-nav ms-5">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-link ${isActive ? "text-white" : "text-secondary"}`
          }
        >
          Words
        </NavLink>
        <NavLink
          to="/managers"
          className={({ isActive }) =>
            `nav-link ms-3 ${isActive ? "text-white" : "text-secondary"}`
          }
        >
          Managers
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
