import React, { useEffect, useRef, useState } from "react";
import "./RegisterPage.css";
import { Affix, Button, Card, Flex, Input, Modal, Spin, message, Image } from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserService from "../../../../api/UserService";
import { HttpStatusCode } from "axios";
import { useDispatch } from "react-redux";
import { changeUserAuthentication } from "../../../redux/AuthSlice";

const RegisterPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [isDisabledRegister, setIsDisabledRegister] = useState(false);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onRegisterClick = () => {
    if (!inputValue.username || !inputValue.password) {
      messageApi.open({
        type: "error",
        content: "You have not input enought field, please check again"
      })
    } else {
      setLoading(true);
      setIsDisabledRegister(true);
      UserService.register(inputValue).then((result) => {
        if (result.status === HttpStatusCode.Ok) {
          dispatch(changeUserAuthentication(true));
          localStorage.setItem("jwtToken", JSON.stringify(result.data.token));
          const modal = Modal.confirm({
            icon: null,
            title: null,
            content: (
              <Flex gap={20} justify="center" vertical>
                <Image src="/Done.png" preview={false}></Image>
                <p className="modal-title">Register Succesfully!</p>
              </Flex>
            ),
            footer: (
              <Button
                className="modal-confirm-btn"
                onClick={() => {
                  modal.destroy();
                  return navigate("/");
                }}
              >
                Continue
              </Button>
            ),
          });
          setLoading(false);
          setIsDisabledRegister(false);
        }
      }).catch((err) => {
        messageApi.open({
          type: "error",
          content: `Register failed because ${err.response.data.message}`
        })
        setLoading(false);
        setIsDisabledRegister(false);
      });
    }
  };

  return (
    <div className="main-container">
      {contextHolder}
      <Spin
        spinning={loading}
        fullscreen
        indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
      />
      <Flex vertical className="register-container" gap={25}>
        <p className="register-label">Register</p>
        <Flex vertical className="input-container">
          <label htmlFor="input-field" className="input-label">
            Username
          </label>
          <Input
            type="text"
            value={username}
            name="username"
            className="input-field"
            placeholder="Username"
            onChange={handleChange}
          />
        </Flex>
        <Flex vertical className="input-container">
          <label htmlFor="input-field" className="input-label">
            Password
          </label>
          <Input.Password
            type="text"
            value={password}
            name="password"
            className="input-field"
            placeholder="Password"
            onChange={handleChange}
          />
        </Flex>
        <a onClick={() => navigate("/login")}>
          {" "}
          You already have an account? Login here{" "}
        </a>
        <Button
          className="save-button"
          onClick={onRegisterClick}
          disabled={isDisabledRegister}
        >
          Register
        </Button>
      </Flex>
    </div>
  );
};

export default RegisterPage;
