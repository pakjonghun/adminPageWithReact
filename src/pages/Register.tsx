import { FC, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import ErrorMessage from "../components/ErrorMessage";
import "../Login.css";

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // useEffect(() => {
  //   const { password, passwordConfirm } = getValues();
  //   console.log(passwordConfirm, passwordConfirm);
  //   if (password !== passwordConfirm) {
  //     setError("passwordConfirm", {
  //       type: "passwordConfirm",
  //       message: "password doesnt match",
  //     });
  //   } else {
  //     clearErrors("passwordConfirm");
  //   }
  // }, [setError, clearErrors, getValues]);

  console.log(errors, isValid);
  const onSubmit: SubmitHandler<FieldValues> = (value) => {
    const { password, passwordConfirm, ...rest } = value;
  };

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
        <label htmlFor="floatingPassword">Password</label>
        <input
          {...register("password", {
            required: { value: true, message: "password plz" },
          })}
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        {errors?.password && <ErrorMessage message={errors.password.message} />}
        <label htmlFor="floatingPasswordConfirm">PasswordConfirm</label>
        <input
          {...register("passwordConfirm", {
            required: { value: true, message: "password confirm plz" },
            validate: {
              isMatch: (v) => {
                const isMatch = getValues().password === v;
                if (!isMatch) {
                  setError("passwordConfirm", {
                    type: "onBlur",
                    message: "not match",
                  });
                } else {
                  clearErrors("passwordConfirm");
                }
                return isMatch;
              },
            },
          })}
          type="password"
          className="form-control"
          id="floatingPasswordConfirm"
          placeholder="PasswordConfirm"
        />
        {errors?.passwordConfirm && (
          <ErrorMessage message={errors.passwordConfirm.message} />
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

export default Register;
