import React, { useEffect, useRef, useState } from "react";
import "./LoginPage.css";
import {
  Affix,
  Button,
  Card,
  Flex,
  Input,
  Modal,
  Spin,
  Image,
  message,
} from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserService from "../../../../api/UserService";
import { HttpStatusCode } from "axios";
import { changeUserAuthentication } from "../../../redux/AuthSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [isDisabledLogin, setIsDisabledLogin] = useState(false);
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

  const onLoginClick = () => {
    if (!inputValue.username || !inputValue.password) {
      messageApi.open({
        type: "error",
        content: "You have not input enought field, please check again",
      });
    } else {
      setLoading(true);
      setIsDisabledLogin(true);
      UserService.login(inputValue)
        .then((result) => {
          if (result.status === HttpStatusCode.Ok) {
            dispatch(changeUserAuthentication(true));
            localStorage.setItem("jwtToken", JSON.stringify(result.data.token));
            const modal = Modal.confirm({
              icon: null,
              title: null,
              content: (
                <Flex gap={20} justify="center" vertical>
                  <Image src="/Done.png" preview={false}></Image>
                  <p className="modal-title">Login Succesfully!</p>
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
          }
          setLoading(false);
          setIsDisabledLogin(false);
        })
        .catch((error) => {
          if (error.response.data.message === "Find failed") {
            messageApi.open({
              type: "error",
              content: `Login failed because username or password is not correct`,
            });
          }
          setLoading(false);
          setIsDisabledLogin(false);
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
      <Flex vertical className="login-container" gap={25}>
        <p className="login-label">Login</p>
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
        <a onClick={() => navigate("/register")}>
          {" "}
          You don't have an account? Register here{" "}
        </a>
        <Button
          className="save-button"
          onClick={onLoginClick}
          disabled={isDisabledLogin}
        >
          Login
        </Button>
      </Flex>
    </div>
  );
};

export default LoginPage;
