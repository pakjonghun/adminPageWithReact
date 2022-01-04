import axios from "axios";
import { FC, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import { IRole } from "../../model/role";

const UserCreate: FC = () => {
  const [roles, setRoles] = useState<IRole[]>([{ id: 0, name: "" }]);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<{ data: IRole[] }>("/roles");
        setRoles(data.data);
      } catch (err) {
        alert("err");
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      await axios.post("/admin/register", value);
      setIsRegistered(true);
    } catch (e) {
      alert("registe failed");
    }
  };

  if (isRegistered) {
    return <Navigate replace to="/users" />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
        {errors?.email && <ErrorMessage message={errors.email.message} />}

        <label htmlFor="floatingFirstname">Firstname</label>
        <input
          {...register("firstname", {
            required: { value: true, message: "input firstname" },
          })}
          className="form-control"
          id="floatingFirstname"
          placeholder="Firstname"
        />
        {errors?.firstname && (
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
        {errors?.lastname && <ErrorMessage message={errors.lastname.message} />}
        <label htmlFor="floatingRole">RoleId</label>
        <select
          {...register("roleId", {
            required: { value: true, message: "input lastname" },
          })}
          className="form-control"
          id="floatingRole"
          placeholder="roleId"
        >
          <option>Select...</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors?.roleId && <ErrorMessage message={errors.roleId.message} />}
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

export default UserCreate;
