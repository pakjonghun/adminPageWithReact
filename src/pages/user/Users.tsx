import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { IUser } from "../../model/user";
import { Meta } from "../../model/meta";
import { Link } from "react-router-dom";
type UsersType = {
  data: IUser[];
  meta: { total: number; page: number; lastPage: number };
};
const Users = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const [meta, setMeta] = useState<Meta>({ page: 0, total: 0, lastPage: 0 });

  const next = async () => {
    if (meta.page + 1 === meta.lastPage) return alert("last page");
    try {
      const { data } = await axios.get<UsersType>(
        `/users?page=${meta.page + 1}`
      );
      setUser(data.data);
      setMeta(data.meta);
    } catch (error) {
      alert("error");
    }
  };

  const previous = async () => {
    if (!meta.page) return alert("first page");
    try {
      const { data } = await axios.get<UsersType>(
        `/users?page=${meta.page - 1}`
      );
      setUser(data.data);
      setMeta(data.meta);
    } catch (error) {
      alert("error");
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<UsersType>("/users");
      setUser(data.data);
      setMeta(data.meta);
    })();
  }, []);
  console.log(meta);
  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.role.id}</td>
                <td>{item.role.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagenation">
          <li className="page-item">
            <Link to="#" className="page-link" onClick={previous}>
              Previous
            </Link>
          </li>
          <li className="page-item">
            <Link to="#" onClick={next} className="page-link">
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Users;
