import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagnator from "../../components/Pagnator";
import Wrapper from "../../components/Wrapper";
import { Meta } from "../../model/meta";
import { IOreder } from "../../model/Order";

const Orders = () => {
  const [page, setPage] = useState<number>(1);
  const [orders, setOrders] = useState<IOreder[]>([]);
  const [meta, setMeta] = useState<Meta>({ page: 1, lastPage: 0, total: 0 });

  const onSelected = (id: number) => {
    setOrders((orders) => {
      return orders.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            ...(order.selected ? { selected: false } : { selected: true }),
          };
        }
        return order;
      });
    });
  };

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get<{ data: IOreder[]; meta: Meta }>(
          `/orders?page=${page}`
        );
        setMeta(data.meta);
        setOrders(data.data);
      })();
    } catch (err) {
      alert(err);
    }
  }, [page]);

  const onDelete = async (id: number) => {
    try {
      await axios.delete(`/orders/${id}`);
      setOrders((orders) => orders.filter((order) => order.id !== id));
    } catch (err) {
      alert(err);
    }
  };

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
              <th scope="col">CreatedAt</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <React.Fragment key={item.id}>
                <tr
                  onClick={(event) => {
                    const taget = event.target as HTMLElement;
                    if (taget.matches("button")) return;
                    onSelected(item.id);
                  }}
                  key={item.id}
                >
                  <td>{item.id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      delete
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <div
                      className={`innerTable ${
                        item.selected ? "show" : "hidden"
                      }`}
                    >
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.orderItems.map((jtem) => (
                            <tr key={jtem.id}>
                              <td>{jtem.id}</td>
                              <td>{jtem.title}</td>
                              <td>{jtem.price}</td>
                              <td>{jtem.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <Pagnator setPage={setPage} lastPage={meta.lastPage} />
    </Wrapper>
  );
};

export default Orders;
