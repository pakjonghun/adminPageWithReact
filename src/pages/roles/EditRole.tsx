import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import { IPermission } from "../../model/permission";
import { IRole } from "../../model/role";

type Meta = {
  total: number;
  page: number;
  lastPage: number;
};

const EditRole: FC = () => {
  const [permissions, setPermissions] = useState<IPermission[]>([
    { id: 0, name: "" },
  ]);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [choicePer, setChoicePer] = useState<Array<number>>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<{
          data: IPermission[];
          meta: Meta;
        }>("/permissions");
        setPermissions(data.data);
      } catch (err) {
        alert("err");
      }
    })();
  }, []);

  const state = useLocation();
  const lo = state.state as IRole;

  const onChange = (id: number) => {
    setChoicePer((pre) => {
      if (!pre.some((p) => p === id)) return [...pre, id];
      return pre.filter((item) => item !== id);
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: lo.name,
    },
  });
  const { id } = useParams();
  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      await axios.put(`/roles/${id}`, { ...value, permissions: choicePer });
      setIsRegistered(true);
    } catch (e) {
      alert("edit failed");
    }
  };

  if (isRegistered) {
    return <Navigate replace to="/roles" />;
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

        <div className="mb-10 row">
          <label htmlFor="floatingInput" className="checkTitle">
            Permissions
          </label>
          {permissions.map((per) => {
            const id = Math.random().toString(20).substring(2, 12);
            return (
              <div className="form-check form-check-inline col-5" key={per.id}>
                <input
                  onChange={() => onChange(per.id)}
                  className="form-check-input"
                  type="checkbox"
                  value={per.id}
                  id={id}
                />
                <label className="form-check-label" htmlFor={id}>
                  {per.name}
                </label>
              </div>
            );
          })}
        </div>

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

export default EditRole;
