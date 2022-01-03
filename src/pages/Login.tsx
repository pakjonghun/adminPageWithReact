import axios from "axios";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../components/ErrorMessage";

type LocationProps = {
  email?: string;
  password?: string;
};

const Login: FC = () => {
  const location = useLocation();
  const [isLoggedIn, seIsLoggedIn] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      await axios.post("/users/login", value, { withCredentials: true });
      seIsLoggedIn(true);
    } catch (err) {
      alert("err");
    }
  };
  const lo = location.state as LocationProps;

  if (isLoggedIn) return <Navigate to="/dashboard" />;

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <label htmlFor="floatingInput">Email address</label>
        <input
          value={lo.email ? lo.email : ""}
          {...register("email", {
            required: { value: true, message: "input email" },
            pattern: {
              value: /^[a-zA-Z0-9]+\@[a-zA-Z]+\.[a-zA-Z]+$/,
              message: "email plz",
            },
          })}
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        {errors?.email && <ErrorMessage message={errors.email.message} />}
        <label htmlFor="floatingPassword">Password</label>
        <input
          value={lo.password ? lo.password : ""}
          {...register("password", {
            required: { value: true, message: "password plz" },
          })}
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        {errors?.password && <ErrorMessage message={errors.password.message} />}

        <SubmitBtn
          passValid={isValid}
          className="w-100 btn btn-lg btn-primary"
          type="submit"
        >
          {isValid ? "Sign in" : "Waiting insert"}
        </SubmitBtn>
      </form>
    </main>
  );
};

const SubmitBtn = styled.button<{ passValid: boolean }>`
  pointer-events: ${({ passValid }) => (passValid ? "auto" : "none")};
  opacity: ${({ passValid }) => (passValid ? 1 : 0.5)};
`;

export default Login;
