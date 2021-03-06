import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagnator from "../../components/Pagnator";
import Wrapper from "../../components/Wrapper";
import { Meta } from "../../model/meta";
import { IProducts } from "../../model/products";

const Products = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, lastPage: 0, page: 0 });
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get<{ data: IProducts[]; meta: Meta }>(
          `/products?page=${page}`
        );
        setProducts(data.data);
        setMeta(data.meta);
      })();
    } catch (err) {
      alert("err");
    }
  }, [page]);

  const onDelete = async (id: number) => {
    try {
      await axios.delete(`/products/${id}`);
      setProducts((pre) => pre.filter((item) => item.id !== id));
    } catch (err) {
      alert(err);
    }
  };

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
                      onClick={() => onDelete(item.id)}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Delete
                    </Link>
                  </div>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/products/${item.id}/edit`}
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
      <Pagnator lastPage={meta.lastPage} setPage={setPage} />
    </Wrapper>
  );
};

export default Products;
