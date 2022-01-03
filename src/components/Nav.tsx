import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./Wrapper";

type NavProps = {
  setUser: (args: User) => void;
  initialUser: User;
  user: User;
};

const Nav: FC<NavProps> = ({ setUser, initialUser, user }) => {
  const onLogoutClick = async () => {
    try {
      await axios("/users/logout");
      setUser(initialUser);
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
        {user.firstname}
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
