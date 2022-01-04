import axios from "axios";
import { useEffect, useState } from "react";
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
  const [page, setPage] = useState<number>(0);

  const next = () => {
    if (page + 1 === meta.lastPage) return alert("last page");
    setPage(page + 1);
  };

  const previous = () => {
    if (!page) return alert("first page");
    setPage(page - 1);
  };

  const onDelete = async (id: number) => {
    try {
      if (window.confirm("are you sure?")) {
        await axios.delete(`/admin/${id}`);
        setUser((pre) => pre.filter((item) => item.id !== id));
      }
    } catch (error) {
      alert("delete fail");
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<UsersType>(`/users?page=${page}`);
      setUser(data.data);
      setMeta(data.meta);
    })();
  }, [page, setUser, setMeta]);

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-button">
        <Link to="/users/create" className="btn btn-sm btn-outline-secondary">
          ADD
        </Link>
      </div>

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
                <td>{item.role?.name}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to="#"
                      onClick={() => onDelete(item.id)}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Delete
                    </Link>
                  </div>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/users/edit/${item.id}`}
                      className="btn btn-sm btn-outline-secondary"
                      state={item}
                    >
                      Edit
                    </Link>
                  </div>
                </td>
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
