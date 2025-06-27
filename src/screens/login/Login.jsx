import React from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import Spinner from "../../components/spinner/Spinner";
import loginStyles from "../login/login.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaS,
  FaUser,
} from "react-icons/fa6";
import axios from "axios";
import { baseUrl, endPoints } from "../../utilities/url";

function Login() {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const isUserId = localStorage.getItem("userId");
    setUserId(isUserId);
  }, []);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const response = await axios.post(
        `${baseUrl}${endPoints.login}`,
        loginDetails
      );
      if (response) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate(`/profile/${userId}`);
        }, 3000);
      }
    } catch (error) {
      if (error) {
        setIsError(true);
        setErrorMessage(error.response?.data?.message);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    } finally {
      setShowSpinner(false);
    }
  };
  return (
    <div className={loginStyles.wrapper}>
      {showModal || isError ? (
        <Modal
          wrapperColor={isError ? loginStyles.error : null}
          header={showModal ? "Welcome" : isError ? "Failed" : null}
          body={
            showModal
              ? "Login successfully, enjoy our unlimited offer."
              : isError
              ? `${errorMessage}`
              : null
          }
        />
      ) : null}
      {showSpinner && <Spinner />}
      <section className={loginStyles.sec_01}>
        <form action="POST" onSubmit={handleLogin}>
          <div>
            <Input
              header={"Login"}
              icon_A={FaEnvelope}
              type={"text"}
              placeholder={"Email"}
              value={loginDetails.email}
              name={"email"}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <Input
              icon_A={FaLock}
              icon_B={showPassword ? FaEye : FaEyeSlash}
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              value={loginDetails.password}
              name={"password"}
              onChange={handleOnChange}
              click={handleShowPassword}
            />
          </div>

          <Button children={"Login"} type={"submit"} />
        </form>
      </section>
      <section className={loginStyles.sec_02}>
        <p>Don't have an account?</p>{" "}
        <button onClick={() => navigate("/")}>Sign Up</button>
      </section>
    </div>
  );
}

export default Login;
