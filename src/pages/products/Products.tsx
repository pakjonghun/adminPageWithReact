import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Meta } from "../../model/meta";
import { IProducts } from "../../model/products";

const Products = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, lastPage: 0, page: 0 });

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get<{ data: IProducts[]; meta: Meta }>(
          "/products"
        );
        setProducts(data.data);
        setMeta(data.meta);
      })();
    } catch (err) {
      alert("err");
    }
  }, []);

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-button">
        <Link
          to="/products/create"
          className="btn btn-sm btn-outline-secondary"
        >
          ADD
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <img src={item.image} alt={item.title} />
                </td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to="#"
                      // onClick={() => onDelete(item.id)}
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
            {/* <Link to="#" className="page-link" onClick={previous}>
              Previous
            </Link> */}
          </li>
          <li className="page-item">
            {/* <Link to="#" className="page-link" onClick={next}>
              Next
            </Link> */}
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Products;
