import React, { FC } from "react";
import { Link } from "react-router-dom";

const Pagnator: FC<{
  lastPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ lastPage, setPage }) => {
  const next = async () => {
    setPage((pre) => (pre === lastPage ? pre : pre + 1));
  };

  const previous = async () => {
    setPage((pre) => (pre === 1 ? pre : pre - 1));
  };

  return (
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
  );
};

export default Pagnator;
