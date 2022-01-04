import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../model/user";
import Menu from "./Menu";
import Nav from "./Nav";

const Wrapper: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await axios.get("/users/me");
      } catch (err) {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Nav />

      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
