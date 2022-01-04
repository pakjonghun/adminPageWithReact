import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { IRole } from "../../model/role";

type Meta = {
  page: number;
  total: number;
  lastPage: number;
};

const Roles = () => {
  const [meta, setMeta] = useState<Meta>({ page: 1, total: 0, lastPage: 0 });
  const [roles, setRoles] = useState<IRole[]>([{ id: 0, name: "" }]);
  const [page, setPage] = useState<number>(0);

  const onDelete = async (id: number) => {
    try {
      if (window.confirm("are you sure?")) {
        await axios.delete(`/roles/${id}`);
        setRoles((pre) => pre.filter((role) => role.id !== id));
      }
    } catch (err) {
      alert(err);
    }
  };

  const next = async () => {
    if (page + 1 === meta.lastPage) return alert("last page");
    setPage((pre) => pre + 1);
  };

  const previous = async () => {
    if (!page) return alert("first page");
    setPage((pre) => pre - 1);
  };

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get<{ data: IRole[]; meta: Meta }>(
          `/roles?page=${page}`
        );
        setMeta(data.meta);
        setRoles(data.data);
      })();
    } catch (err) {
      alert(err);
    }
  }, [page]);

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-button">
        <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">
          ADD
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Permissions</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {roles.map((role) => {
                    if (!role.permissions?.length) return "none";
                    return role.permissions.map((per) => (
                      <div key={per.id}>{per.name}</div>
                    ));
                  })}
                </td>
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
                      to={`/roles/${item.id}/edit`}
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
            <Link to="#" className="page-link" onClick={next}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Roles;
