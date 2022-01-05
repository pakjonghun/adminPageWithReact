import { FC, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import * as c3 from "c3";
import axios from "axios";

const Dashboard: FC = (props) => {
  useEffect(() => {
    (async () => {
      const chart = c3.generate({
        data: {
          x: "X",
          columns: [["X"], ["Sales"]],
          types: {
            Sales: "bar",
          },
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              format: "%Y-%m-%d",
            },
          },
        },
      });
      const { data } = await axios.get("/orders/chart");
      chart.load({
        columns: [
          ["X", ...data.map((r: any) => r.date)],
          ["Sales", ...data.map((r: any) => Number(r.priceSum))],
        ],
      });
    })();
  }, []);

  return (
    <Wrapper>
      <h2>Daily Sale</h2>
      <div id="chart" />
    </Wrapper>
  );
};

export default Dashboard;
