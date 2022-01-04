import axios from "axios";
import { FC, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import { IPermission } from "../../model/permission";
import { IRole } from "../../model/role";

const RoleEdit: FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const { id } = useParams();
  const lo = useLocation();
  const location = lo.state as IPermission;
  const [roles, setRoles] = useState<IPermission[]>([{ name: "", id: 0 }]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<{ data: IRole[] }>("/permissions");
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
  } = useForm({
    mode: "onChange",
    defaultValues: {
      permissions: location?.id,
      name: location?.name,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      await axios.put(`/roles/${id}`, value);
      setIsRegistered(true);
    } catch (e) {
      alert("edit failed");
    }
  };

  if (isRegistered) {
    return <Navigate replace to="/users" />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Edit RoleInfo </h1>
        <label htmlFor="floatingRolename">Role Name</label>
        <input
          {...register("name", {
            required: { value: true, message: "input firstname" },
          })}
          className="form-control"
          id="floatingRolename"
          placeholder="name"
        />
        {errors?.name?.message && (
          <ErrorMessage message={errors.name.message} />
        )}

        <label htmlFor="floatingPermissionId">PermissionId</label>
        <select
          {...register("permissions", {
            required: { value: true, message: "input PermissionId" },
          })}
          className="form-control"
          id="floatingPermissionId"
          placeholder="PermissionId"
        >
          <option>Select...</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        {errors?.permissions?.message && (
          <ErrorMessage message={errors.permissions.message} />
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

export default RoleEdit;
