import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Role } from "../model/role";
import { IUser, User } from "../model/user";

const Nav: FC = () => {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<typeof user>("/users/me");
        setUser(
          new User(
            data.id,
            data.firstname,
            data.lastname,
            data.email,
            new Role(data.role.id, data.role.name)
          )
        );
      } catch (err) {
        alert("load fail");
      }
    })();
  }, []);

  const onLogoutClick = async () => {
    try {
      await axios("/users/logout");
      // setIsLoggedIn(false);
    } catch (err) {
      alert("err");
    }
  };

  return (
    <div className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
        to="/dashboard"
      >
        Company name
      </Link>
      <Link className="p-2 text-white text-decoration-none" to="/profile">
        {user.name}
      </Link>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <Link className="nav-link px-3" to="/login" onClick={onLogoutClick}>
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
