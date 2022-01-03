import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Nav from "./Nav";
export type User = {
  firstname: string;
  lastname: string;
  email: string;
  role: {
    name: string;
    id: number;
  };
};

const initialUser = {
  firstname: "",
  lastname: "",
  email: "",
  role: { name: "", id: 0 },
};
const Wrapper: FC = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(initialUser);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<User>("/users/me");
        setUser(data);
      } catch (err) {
        navigate("/login");
      }
    })();

    return () => setUser(initialUser);
  }, [navigate]);
  return (
    <>
      <Nav user={user} setUser={setUser} initialUser={initialUser} />

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
