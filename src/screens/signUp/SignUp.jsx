import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import Spinner from "../../components/spinner/Spinner";

import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaS,
  FaUser,
} from "react-icons/fa6";
import { Gender } from "../../components/input/Input";
import signUpStyles from "../signUp/signUp.module.css";
import axios from "axios";
import { baseUrl, endPoints } from "../../utilities/url";

function SignUp() {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    gender: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSignUpDetails((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const response = await axios.post(
        `${baseUrl}${endPoints.register}`,
        signUpDetails
      );
      if (response) {
        setShowModal(true);
        const userId = response.data?.userId;
        localStorage.setItem("userId", userId);
        console.log(response.data);
        setTimeout(() => {
          setShowModal(false);
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      if (error) {
        setErrorMessage(error.response?.data?.message);
        setIsError(true);
        console.log(error.response.data);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    } finally {
      setShowSpinner(false);
    }
  };
  return (
    <div className={signUpStyles.wrapper}>
      {showModal || isError ? (
        <Modal
          wrapperColor={isError ? signUpStyles.error : null}
          header={showModal ? "Success" : isError ? "Failed" : null}
          body={
            showModal
              ? "Congrats your account is now open, you have access to all our amazing plane and benefits"
              : isError
              ? `${errorMessage}`
              : null
          }
        />
      ) : null}
      {showSpinner && <Spinner />}
      <section className={signUpStyles.sec_01}>
        <form action="POST" onSubmit={handleSignUp}>
          <div>
            <Input
              header={"Sign Up"}
              icon_A={FaUser}
              type={"text"}
              placeholder={"First Name"}
              value={signUpDetails.firstName}
              name={"firstName"}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <Input
              icon_A={FaUser}
              type={"text"}
              placeholder={"Last Name"}
              value={signUpDetails.lastName}
              name={"lastName"}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Input
              type={"text"}
              placeholder={"Middle Name"}
              value={signUpDetails.middleName}
              name={"middleName"}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Input
              icon_A={FaEnvelope}
              type={"text"}
              placeholder={"Email"}
              value={signUpDetails.email}
              name={"email"}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <Gender
              type={"radio"}
              maleValue={"male"}
              maleName={"gender"}
              maleChecked={signUpDetails.gender === "male"}
              maleOnChange={handleOnChange}
              femaleValue={"female"}
              femaleName={"gender"}
              femaleChecked={signUpDetails.gender === "female"}
              femaleOnChange={handleOnChange}
            />
          </div>

          <div>
            <Input
              icon_A={FaLock}
              icon_B={showPassword ? FaEye : FaEyeSlash}
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              value={signUpDetails.password}
              name={"password"}
              onChange={handleOnChange}
              click={handleShowPassword}
            />
          </div>
          <Button children={"Sign Up"} type={"submit"} />
        </form>
      </section>
      <section className={signUpStyles.sec_02}>
        <p>Already have an account?</p>{" "}
        <button onClick={() => navigate("/login")}>Login</button>
      </section>
    </div>
  );
}

export default SignUp;
