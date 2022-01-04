import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import { IPermission } from "../../model/permission";

type Meta = {
  total: number;
  page: number;
  lastPage: number;
};

const RoleCreate: FC = () => {
  const [permissions, setPermissions] = useState<IPermission[]>([
    { id: 0, name: "" },
  ]);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 0, lastPage: 0 });
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [choicePer, setChoicePer] = useState<Array<number>>([]);

  const onClick = (id: number) => {
    setChoicePer((pre) => [...pre, id]);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<{
          data: IPermission[];
          meta: Meta;
        }>("/permissions");
        setPermissions(data.data);
        setMeta(meta);
      } catch (err) {
        alert("err");
      }
    })();
  }, [meta]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      console.log(value);
      console.log(choicePer);

      await axios.post("/roles/register", { ...value, permissions: choicePer });
      setIsRegistered(true);
    } catch (e) {
      alert("registe failed");
    }
  };

  if (isRegistered) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <label htmlFor="floatingInput">Role name</label>
        <input
          {...register("name", {
            required: { value: true, message: "input name" },
          })}
          className="form-control"
          id="floatingInput"
          placeholder="Name"
        />
        {errors?.name?.message && (
          <ErrorMessage message={errors.name.message} />
        )}

        <div
          className="btn-group"
          role="group"
          aria-label="Basic checkbox toggle button group"
        >
          {permissions.map((per) => {
            const id = Math.random().toString(20).substring(2, 12);
            return (
              <React.Fragment key={per.id}>
                <input
                  onClick={() => onClick(per.id)}
                  className="btn-check"
                  type="checkbox"
                  value={per.id}
                  id={id}
                />
                <label className="btn btn-outline-primary" htmlFor={id}>
                  {per.name}
                </label>
              </React.Fragment>
            );
          })}
        </div>

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

export default RoleCreate;
