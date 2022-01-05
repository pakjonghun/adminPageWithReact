import axios from "axios";
import React, { FC, useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import ImageUpload from "../../components/ImageUpload";
import { IProducts } from "../../model/products";

const ProductEdit: FC = () => {
  const state = useLocation();
  const lo = state.state as IProducts;
  const ref = useRef<HTMLInputElement>(null);

  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [image, setImage] = useState<string>();
  const upload = (url: string) => {
    if (ref.current) {
      ref.current.value = url;
    }
    setImage(url);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: lo.title,
      description: lo.description,
      price: lo.price,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      await axios.put(`/products/${lo.id}`, {
        ...value,
        ...(image && { image }),
      });

      setIsRegistered(true);
    } catch (e) {
      alert("registe failed");
    }
  };

  if (isRegistered) {
    return <Navigate replace to="/products" />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Registe Product </h1>

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
            pattern: { value: /[0-9]+/, message: "숫자만 입력하세요" },
          })}
          className="form-control"
          id="floatingInput"
          placeholder="price"
        />
        {errors?.price?.message && (
          <ErrorMessage message={errors.price.message} />
        )}

        <div className="input-group">
          <label htmlFor="image">Upload</label>
          <input
            ref={ref}
            defaultValue={lo.image}
            className="form-control"
            id="image"
          />
          <ImageUpload cb={upload} />
        </div>

        <SubmitBtn
          passValid={isValid}
          className="w-100 btn btn-lg btn-primary"
          type="submit"
        >
          {isValid ? "Save" : "Waiting insert"}
        </SubmitBtn>
      </form>
    </main>
  );
};

const SubmitBtn = styled.button<{ passValid: boolean }>`
  pointer-events: ${({ passValid }) => (passValid ? "auto" : "none")};
  opacity: ${({ passValid }) => (passValid ? 1 : 0.5)};
`;

export default ProductEdit;
