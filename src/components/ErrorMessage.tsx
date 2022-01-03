import { FC } from "react";
import styled from "styled-components";
type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <Message>{message}</Message>;
};

export default ErrorMessage;

const Message = styled.div`
  height: 1.2rem;
  margin: -0.5rem 0 0.3rem 0.3rem;
  font-size: large.8rem;
  color: red;
`;
