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

const ProductCreate: FC = () => {
  const [permissions, setPermissions] = useState<IPermission[]>([
    { id: 0, name: "" },
  ]);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 0, lastPage: 0 });
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
        setMeta(meta);
      } catch (err) {
        alert("err");
      }
    })();
  }, [meta]);

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
  } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      await axios.post("/roles/register", { ...value, permissions: choicePer });
      setIsRegistered(true);
    } catch (e) {
      alert("registe failed");
    }
  };

  if (isRegistered) {
    return <Navigate replace to="/roles" />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <label htmlFor="floatingInput">Product name</label>
        <input
          {...register("title", {
            required: { value: true, message: "input name" },
          })}
          className="form-control"
          id="floatingInput"
          placeholder="Name"
        />
        {errors?.title?.message && (
          <ErrorMessage message={errors.title.message} />
        )}

        <label htmlFor="floatingInput">Product description</label>
        <input
          {...register("description", {
            required: { value: true, message: "input description" },
          })}
          className="form-control"
          id="floatingInput"
          placeholder="description"
        />
        {errors?.description?.message && (
          <ErrorMessage message={errors.description.message} />
        )}

        <label htmlFor="floatingInput">Product price</label>
        <input
          {...register("price", {
            required: { value: true, message: "input price" },
          })}
          className="form-control"
          id="floatingInput"
          placeholder="price"
        />
        {errors?.price?.message && (
          <ErrorMessage message={errors.price.message} />
        )}

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input className="form-control" type="file" id="formFile" />
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

export default ProductCreate;
