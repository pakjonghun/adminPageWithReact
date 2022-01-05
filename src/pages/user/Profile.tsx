import axios from "axios";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import Wrapper from "../../components/Wrapper";
import { IRole } from "../../model/role";
import { IUser, User } from "../../model/user";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<IUser>(`/users/me`);
        setEmail(data.email);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        data.role && setRole(data.role?.name);
      } catch (err) {
        alert("err");
      }
    })();
  }, []);

  const onInfoEdit = async () => {
    try {
      const { data } = await axios.put("/users/info", {
        firstname,
        lastname,
        email,
      });
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setEmail(data.email);
    } catch (err) {
      alert("err");
    }
  };

  const onPassword = async () => {
    try {
      const { data } = await axios.put("/users/password", {
        password,
        passwordConfirm,
      });
      setPassword(data.password);
      setPasswordConfirm(data.passwordConfirm);
    } catch (err) {
      alert("err");
    }
  };

  return (
    <Wrapper>
      <main className="form-signin">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onInfoEdit();
          }}
        >
          <h1 className="h3 mb-3 fw-normal">Profile </h1>

          <label htmlFor="floatingInput">Email address</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />

          <label htmlFor="floatingFirstname">Firstname</label>
          <input
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            name="firstname"
            className="form-control"
            id="floatingFirstname"
            placeholder="Firstname"
          />

          <label htmlFor="floatingLastname">Lastname</label>
          <input
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="form-control"
            id="floatingLastname"
            placeholder="Lastname"
          />

          <label htmlFor="floatingRole">Role</label>
          <input
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-control"
            id="floatingRole"
            placeholder="roleId"
          />

          <SubmitBtn>{"submit"}</SubmitBtn>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPassword();
          }}
        >
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="passwordConfirm">passwordConfirm</label>
          <input
            type="password"
            id="passwordCofirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <SubmitBtn>{"submit"}</SubmitBtn>
        </form>
      </main>
    </Wrapper>
  );
};

const SubmitBtn = styled.button``;
export default Profile;
