import axios from "axios";
import { FC, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import { IUser, User } from "../../model/user";

const UserEdit: FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(new User(0, "", "", ""));
  const { id } = useParams();
  const lo = useLocation();
  const location = lo.state as IUser;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstname: location?.firstname,
      lastname: location?.lastname,
      email: location?.email,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      await axios.put(`/users/${id}`, value);
      setIsRegistered(true);
    } catch (e) {
      alert("edit failed");
    }
  };

  if (isRegistered) {
    return <Navigate replace to="/users" />;
  }
  console.log(user);

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Edit UserInfo </h1>

        <label htmlFor="floatingInput">Email address</label>
        <input
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
        {errors?.email?.message && (
          <ErrorMessage message={errors.email.message} />
        )}

        <label htmlFor="floatingFirstname">Firstname</label>
        <input
          {...register("firstname", {
            required: { value: true, message: "input firstname" },
          })}
          className="form-control"
          id="floatingFirstname"
          placeholder="Firstname"
        />
        {errors?.firstname?.message && (
          <ErrorMessage message={errors.firstname.message} />
        )}
        <label htmlFor="floatingLastname">Lastname</label>
        <input
          {...register("lastname", {
            required: { value: true, message: "input lastname" },
          })}
          className="form-control"
          id="floatingLastname"
          placeholder="Lastname"
        />
        {errors?.lastname?.message && (
          <ErrorMessage message={errors.lastname.message} />
        )}

        <SubmitBtn
          passValid={isValid}
          className="w-100 btn btn-lg btn-primary"
          type="submit"
        >
          {isValid ? "Edit" : "Waiting insert"}
        </SubmitBtn>
      </form>
    </main>
  );
};

const SubmitBtn = styled.button<{ passValid: boolean }>`
  pointer-events: ${({ passValid }) => (passValid ? "auto" : "none")};
  opacity: ${({ passValid }) => (passValid ? 1 : 0.5)};
`;

export default UserEdit;
