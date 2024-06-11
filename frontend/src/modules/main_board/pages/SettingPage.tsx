import React, { useState } from "react";
import "./CreateTaskPage.css";
import { Button, Flex, Image, Input, Modal, Spin, message } from "antd";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "../../../../api/UserService.ts";
import { LoadingOutlined } from "@ant-design/icons";

const SettingPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [changePasswordEnabled, setChangePasswordEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { oldPassword, newPassword } = inputValue;
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangePasswordClick = () => {
    if (!inputValue.oldPassword || !inputValue.newPassword) {
      messageApi.open({
        type: "error",
        content: "You have not input enought field, please check again",
      });
    } else {
      setChangePasswordEnabled(true);
      setLoading(true);
      UserService.changePassword(inputValue)
        .then((result) => {
          if (result.status === HttpStatusCode.Ok) {
            const modal = Modal.confirm({
              icon: null,
              title: null,
              content: (
                <Flex gap={20} justify="center" vertical>
                  <Image src="/Done.png" preview={false}></Image>
                  <p className="modal-title">Change password successfully!</p>
                  <p className="modal-description">
                    Your password has changed successfully
                  </p>
                </Flex>
              ),
              footer: (
                <Button
                  className="modal-confirm-btn"
                  onClick={() => {
                    modal.destroy();
                  }}
                >
                  Continue
                </Button>
              ),
            });
            setChangePasswordEnabled(false);
            setLoading(false);
          }
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: error.response.data.message,
          });

          setLoading(false);
          setChangePasswordEnabled(false);
        });
    }
  };
  return (
    <>
      {contextHolder}
      <Spin
        spinning={loading}
        fullscreen
        indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
      />
      <Flex vertical gap="small">
        <Flex className="board-title" justify="space-between" align="center">
          <div className="title-text">Setting</div>
        </Flex>
        <Flex justify="space-between">
          <Flex vertical className="page-container">
            <Flex className="form-container">
              <Flex className="form-info-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M14.0002 7.2915C14.2322 7.2915 14.4548 7.38369 14.6189 7.54779C14.783 7.71188 14.8752 7.93444 14.8752 8.1665V15.1665C14.8752 15.3986 14.783 15.6211 14.6189 15.7852C14.4548 15.9493 14.2322 16.0415 14.0002 16.0415C13.7681 16.0415 13.5455 15.9493 13.3814 15.7852C13.2174 15.6211 13.1252 15.3986 13.1252 15.1665V8.1665C13.1252 7.93444 13.2174 7.71188 13.3814 7.54779C13.5455 7.38369 13.7681 7.2915 14.0002 7.2915ZM14.0002 19.8332C14.3096 19.8332 14.6063 19.7103 14.8251 19.4915C15.0439 19.2727 15.1668 18.9759 15.1668 18.6665C15.1668 18.3571 15.0439 18.0603 14.8251 17.8415C14.6063 17.6228 14.3096 17.4998 14.0002 17.4998C13.6907 17.4998 13.394 17.6228 13.1752 17.8415C12.9564 18.0603 12.8335 18.3571 12.8335 18.6665C12.8335 18.9759 12.9564 19.2727 13.1752 19.4915C13.394 19.7103 13.6907 19.8332 14.0002 19.8332Z"
                    fill="#2F56DE"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.4585 14.0002C1.4585 7.07366 7.07366 1.4585 14.0002 1.4585C20.9267 1.4585 26.5418 7.07366 26.5418 14.0002C26.5418 20.9267 20.9267 26.5418 14.0002 26.5418C7.07366 26.5418 1.4585 20.9267 1.4585 14.0002ZM14.0002 3.2085C11.138 3.2085 8.39313 4.34547 6.3693 6.3693C4.34547 8.39313 3.2085 11.138 3.2085 14.0002C3.2085 16.8623 4.34547 19.6072 6.3693 21.631C8.39313 23.6549 11.138 24.7918 14.0002 24.7918C16.8623 24.7918 19.6072 23.6549 21.631 21.631C23.6549 19.6072 24.7918 16.8623 24.7918 14.0002C24.7918 11.138 23.6549 8.39313 21.631 6.3693C19.6072 4.34547 16.8623 3.2085 14.0002 3.2085Z"
                    fill="#2F56DE"
                  />
                </svg>
                <Flex vertical>
                  <p className="form-lable">Change password</p>
                </Flex>
              </Flex>
              <Flex vertical className="form-input-group">
                <Flex vertical className="input-container">
                  <label htmlFor="input-field" className="input-label">
                    Old password
                  </label>
                  <Input.Password
                    type="text"
                    value={oldPassword}
                    name="oldPassword"
                    className="input-field"
                    placeholder="Type password"
                    onChange={handleChange}
                  />
                </Flex>
                <Flex vertical className="input-container">
                  <label htmlFor="input-field" className="input-label">
                    New password
                  </label>
                  <Input.Password
                    type="text"
                    value={newPassword}
                    name="newPassword"
                    className="input-field"
                    placeholder="Type new password"
                    onChange={handleChange}
                  />
                </Flex>
                <Button
                  type="primary"
                  shape="round"
                  disabled={changePasswordEnabled}
                  onClick={onChangePasswordClick}
                >
                  Change password
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default SettingPage;
