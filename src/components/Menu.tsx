import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Menu = () => {
  const style = {
    color: "red",
  };

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link active">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users" className="nav-link active">
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link active">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/roles" className="nav-link active">
              Role
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className="nav-link active">
              Product
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Menu;
