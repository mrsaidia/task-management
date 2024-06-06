import React, { useEffect, useRef, useState } from "react";
import "./CreateTaskPage.css";
import {
  Button,
  Card,
  ColorPicker,
  DatePicker,
  Dropdown,
  Flex,
  Image,
  Input,
  InputRef,
  Modal,
  Select,
  Tag,
  Tooltip,
  UploadProps,
  message,
} from "antd";
import {
  DownloadOutlined,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TaskService from "../../../../api/TaskService";
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import TaskStatus from "../../../../constants/TaskEnum.js";
import DefaultDateFormat from "../../../../constants/DateFormat.js";

const CreateTaskPage = () => {
  const [tags, setTags] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [modalTagVisible, setModalTagVisible] = useState(false);
  const [inputLabelValue, setInputLabelValue] = useState("");
  const [createTaskEnabled, setCreateTaskEnabled] = useState(false);
  const [tagColor, setTagColor] = useState("#1677ff");
  const [tagTextColor, setTagTextColor] = useState("#000000");

  const editInputRef = useRef<InputRef>(null);
  const [inputValue, setInputValue] = useState({
    name: "",
    status: TaskStatus.ToDo,
    startDate: 0,
    dueDate: 0,
    description: "",
    tag: "",
  });
  const { name, description } = inputValue;
  let navigate = useNavigate();

  useEffect(() => {
    setInputValue((prev) => ({
      ...prev,
      tag: JSON.stringify(tags),
    }));
  }, [tags]);

  const handleCloseLabel = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag.tagName !== removedTag);
    setTags(newTags);
  };

  const handleInputLabelChange = (e) => {
    setInputLabelValue(e.target.value);
  };

  const handleTagModalConfirm = () => {
    if (
      inputLabelValue &&
      !tags.includes(inputLabelValue) &&
      tagColor &&
      tagTextColor
    ) {
      setTags((oldTags) =>
        oldTags.concat([
          {
            tagName: inputLabelValue,
            tagColor: tagColor,
            tagTextColor: tagTextColor,
          },
        ])
      );
    }
    setModalTagVisible(false);
    setInputLabelValue("");
    setTagColor("#1677ff");
    setTagTextColor("#000000");
  };

  const tagPlusStyle = {
    height: 22,
    borderStyle: "dashed",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (value) => {
    setInputValue((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleStartDateChange = (date) => {
    setInputValue((prev) => ({
      ...prev,
      startDate: dayjs(date).valueOf(),
    }));
  };

  const handleDueDateChange = (date) => {
    setInputValue((prev) => ({
      ...prev,
      dueDate: dayjs(date).valueOf(),
    }));
  };

  const onCreateTaskClick = () => {
    if (
      !inputValue.name ||
      !inputValue.description ||
      inputValue.dueDate === 0 ||
      inputValue.startDate === 0 ||
      inputValue.tag.length === 0
    ) {
      messageApi.open({
        type: "error",
        content: "You have not input enought field, please check again",
      });
    } else {
      setCreateTaskEnabled(true);
      TaskService.createTask(inputValue).then((result) => {
        if (result.status === HttpStatusCode.Ok) {
          const modal = Modal.confirm({
            icon: null,
            title: null,
            content: (
              <Flex gap={20} justify="center" vertical>
                <Image src="/Done.png" preview={false}></Image>
                <p className="modal-title">Success Create Task!</p>
                <p className="modal-description">
                  Your task has been created, continue using the application
                </p>
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
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Flex vertical gap="small">
        <Flex className="board-title" justify="space-between" align="center">
          <div className="title-text">Add task</div>
          <Flex gap="small" align="center" justify="center">
            <Button
              type="text"
              shape="round"
              className="cancel-button"
              onClick={() => {
                return navigate("/");
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              shape="round"
              disabled={createTaskEnabled}
              onClick={onCreateTaskClick}
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path
                    d="M9.5625 3.09375C9.5625 2.86997 9.4736 2.65536 9.31537 2.49713C9.15714 2.33889 8.94253 2.25 8.71875 2.25C8.49497 2.25 8.28036 2.33889 8.12213 2.49713C7.96389 2.65536 7.875 2.86997 7.875 3.09375V7.875H3.09375C2.86997 7.875 2.65536 7.96389 2.49713 8.12213C2.33889 8.28036 2.25 8.49497 2.25 8.71875C2.25 8.94253 2.33889 9.15714 2.49713 9.31537C2.65536 9.4736 2.86997 9.5625 3.09375 9.5625H7.875V14.3438C7.875 14.5675 7.96389 14.7821 8.12213 14.9404C8.28036 15.0986 8.49497 15.1875 8.71875 15.1875C8.94253 15.1875 9.15714 15.0986 9.31537 14.9404C9.4736 14.7821 9.5625 14.5675 9.5625 14.3438V9.5625H14.3438C14.5675 9.5625 14.7821 9.4736 14.9404 9.31537C15.0986 9.15714 15.1875 8.94253 15.1875 8.71875C15.1875 8.49497 15.0986 8.28036 14.9404 8.12213C14.7821 7.96389 14.5675 7.875 14.3438 7.875H9.5625V3.09375Z"
                    fill="inherit"
                  />
                </svg>
              }
            >
              Create task
            </Button>
          </Flex>
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
                  <p className="form-lable">General Infor</p>
                  <p className="form-description">Nisi laborum eiusmod</p>
                </Flex>
              </Flex>
              <Flex vertical className="form-input-group">
                <Flex vertical className="input-container">
                  <label htmlFor="input-field" className="input-label">
                    Task title
                  </label>
                  <Input
                    type="text"
                    value={name}
                    name="name"
                    className="input-field"
                    placeholder="Type name"
                    onChange={handleChange}
                  />
                </Flex>
                <Flex vertical className="input-container">
                  <label htmlFor="input-field" className="input-label">
                    Status
                  </label>
                  <Select
                    className="input-field"
                    defaultValue={TaskStatus.ToDo}
                    variant="borderless"
                    onChange={handleDropdownChange}
                    options={[
                      { value: TaskStatus.ToDo, label: "To Do" },
                      { value: TaskStatus.InProgress, label: "In Progress" },
                      { value: TaskStatus.OnApproval, label: "On Approval" },
                      { value: TaskStatus.Completed, label: "Completed" },
                    ]}
                  />
                </Flex>
                <Flex>
                  <Flex vertical className="input-container">
                    <label htmlFor="input-field" className="input-label">
                      Start date
                    </label>
                    <DatePicker
                      format={DefaultDateFormat}
                      className="input-field"
                      placeholder="5-14-2024"
                      inputReadOnly
                      allowClear={false}
                      onChange={handleStartDateChange}
                      suffixIcon={
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.5833 12.8333C15.8264 12.8333 16.0596 12.7368 16.2315 12.5648C16.4034 12.3929 16.5 12.1598 16.5 11.9167C16.5 11.6736 16.4034 11.4404 16.2315 11.2685C16.0596 11.0966 15.8264 11 15.5833 11C15.3402 11 15.1071 11.0966 14.9352 11.2685C14.7632 11.4404 14.6667 11.6736 14.6667 11.9167C14.6667 12.1598 14.7632 12.3929 14.9352 12.5648C15.1071 12.7368 15.3402 12.8333 15.5833 12.8333ZM15.5833 16.5C15.8264 16.5 16.0596 16.4034 16.2315 16.2315C16.4034 16.0596 16.5 15.8264 16.5 15.5833C16.5 15.3402 16.4034 15.1071 16.2315 14.9352C16.0596 14.7632 15.8264 14.6667 15.5833 14.6667C15.3402 14.6667 15.1071 14.7632 14.9352 14.9352C14.7632 15.1071 14.6667 15.3402 14.6667 15.5833C14.6667 15.8264 14.7632 16.0596 14.9352 16.2315C15.1071 16.4034 15.3402 16.5 15.5833 16.5ZM11.9167 11.9167C11.9167 12.1598 11.8201 12.3929 11.6482 12.5648C11.4763 12.7368 11.2431 12.8333 11 12.8333C10.7569 12.8333 10.5237 12.7368 10.3518 12.5648C10.1799 12.3929 10.0833 12.1598 10.0833 11.9167C10.0833 11.6736 10.1799 11.4404 10.3518 11.2685C10.5237 11.0966 10.7569 11 11 11C11.2431 11 11.4763 11.0966 11.6482 11.2685C11.8201 11.4404 11.9167 11.6736 11.9167 11.9167ZM11.9167 15.5833C11.9167 15.8264 11.8201 16.0596 11.6482 16.2315C11.4763 16.4034 11.2431 16.5 11 16.5C10.7569 16.5 10.5237 16.4034 10.3518 16.2315C10.1799 16.0596 10.0833 15.8264 10.0833 15.5833C10.0833 15.3402 10.1799 15.1071 10.3518 14.9352C10.5237 14.7632 10.7569 14.6667 11 14.6667C11.2431 14.6667 11.4763 14.7632 11.6482 14.9352C11.8201 15.1071 11.9167 15.3402 11.9167 15.5833ZM6.41667 12.8333C6.65978 12.8333 6.89294 12.7368 7.06485 12.5648C7.23676 12.3929 7.33333 12.1598 7.33333 11.9167C7.33333 11.6736 7.23676 11.4404 7.06485 11.2685C6.89294 11.0966 6.65978 11 6.41667 11C6.17355 11 5.94039 11.0966 5.76849 11.2685C5.59658 11.4404 5.5 11.6736 5.5 11.9167C5.5 12.1598 5.59658 12.3929 5.76849 12.5648C5.94039 12.7368 6.17355 12.8333 6.41667 12.8333ZM6.41667 16.5C6.65978 16.5 6.89294 16.4034 7.06485 16.2315C7.23676 16.0596 7.33333 15.8264 7.33333 15.5833C7.33333 15.3402 7.23676 15.1071 7.06485 14.9352C6.89294 14.7632 6.65978 14.6667 6.41667 14.6667C6.17355 14.6667 5.94039 14.7632 5.76849 14.9352C5.59658 15.1071 5.5 15.3402 5.5 15.5833C5.5 15.8264 5.59658 16.0596 5.76849 16.2315C5.94039 16.4034 6.17355 16.5 6.41667 16.5Z"
                            fill="#2F56DE"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.41665 1.60413C6.59898 1.60413 6.77385 1.67656 6.90278 1.80549C7.03171 1.93442 7.10415 2.10929 7.10415 2.29163V2.99104C7.71098 2.97913 8.37923 2.97913 9.11439 2.97913H12.8846C13.6207 2.97913 14.289 2.97913 14.8958 2.99104V2.29163C14.8958 2.10929 14.9682 1.93442 15.0972 1.80549C15.2261 1.67656 15.401 1.60413 15.5833 1.60413C15.7656 1.60413 15.9405 1.67656 16.0694 1.80549C16.1984 1.93442 16.2708 2.10929 16.2708 2.29163V3.04971C16.5091 3.06804 16.7346 3.09096 16.9482 3.11938C18.0226 3.26421 18.8925 3.56854 19.5791 4.25421C20.2647 4.94079 20.5691 5.81071 20.7139 6.88504C20.8541 7.93004 20.8541 9.26379 20.8541 10.9486V12.8846C20.8541 14.5695 20.8541 15.9041 20.7139 16.9482C20.5691 18.0225 20.2647 18.8925 19.5791 19.579C18.8925 20.2647 18.0226 20.569 16.9482 20.7139C15.9032 20.8541 14.5695 20.8541 12.8846 20.8541H9.11623C7.43139 20.8541 6.09673 20.8541 5.05265 20.7139C3.97831 20.569 3.10839 20.2647 2.42181 19.579C1.73615 18.8925 1.43181 18.0225 1.28698 16.9482C1.14673 15.9032 1.14673 14.5695 1.14673 12.8846V10.9486C1.14673 9.26379 1.14673 7.92913 1.28698 6.88504C1.43181 5.81071 1.73615 4.94079 2.42181 4.25421C3.10839 3.56854 3.97831 3.26421 5.05265 3.11938C5.26623 3.09096 5.49264 3.06804 5.73006 3.04971V2.29163C5.73006 2.10945 5.80237 1.93472 5.9311 1.80581C6.05983 1.67691 6.23447 1.60437 6.41665 1.60413ZM5.23415 4.48246C4.3129 4.60621 3.78123 4.83904 3.39348 5.22679C3.00573 5.61454 2.7729 6.14621 2.64915 7.06838C2.62806 7.22421 2.61065 7.38921 2.59598 7.56246H19.404C19.3893 7.38829 19.3719 7.22421 19.3508 7.06746C19.2271 6.14621 18.9942 5.61454 18.6065 5.22679C18.2187 4.83904 17.6871 4.60621 16.7649 4.48246C15.8235 4.35596 14.5814 4.35413 12.8333 4.35413H9.16664C7.41856 4.35413 6.1774 4.35596 5.23415 4.48246ZM2.52081 11C2.52081 10.2171 2.52081 9.53604 2.53273 8.93746H19.4672C19.4791 9.53604 19.4791 10.2171 19.4791 11V12.8333C19.4791 14.5814 19.4773 15.8235 19.3508 16.7658C19.2271 17.687 18.9942 18.2187 18.6065 18.6065C18.2187 18.9942 17.6871 19.227 16.7649 19.3508C15.8235 19.4773 14.5814 19.4791 12.8333 19.4791H9.16664C7.41856 19.4791 6.1774 19.4773 5.23415 19.3508C4.3129 19.227 3.78123 18.9942 3.39348 18.6065C3.00573 18.2187 2.7729 17.687 2.64915 16.7649C2.52265 15.8235 2.52081 14.5814 2.52081 12.8333V11Z"
                            fill="#2F56DE"
                          />
                        </svg>
                      }
                    />
                  </Flex>
                  <Flex vertical className="input-container">
                    <label htmlFor="input-field" className="input-label">
                      Due date
                    </label>
                    <DatePicker
                      format={DefaultDateFormat}
                      className="input-field"
                      placeholder="5-14-2024"
                      inputReadOnly
                      onChange={handleDueDateChange}
                      allowClear={false}
                      suffixIcon={
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.5833 12.8333C15.8264 12.8333 16.0596 12.7368 16.2315 12.5648C16.4034 12.3929 16.5 12.1598 16.5 11.9167C16.5 11.6736 16.4034 11.4404 16.2315 11.2685C16.0596 11.0966 15.8264 11 15.5833 11C15.3402 11 15.1071 11.0966 14.9352 11.2685C14.7632 11.4404 14.6667 11.6736 14.6667 11.9167C14.6667 12.1598 14.7632 12.3929 14.9352 12.5648C15.1071 12.7368 15.3402 12.8333 15.5833 12.8333ZM15.5833 16.5C15.8264 16.5 16.0596 16.4034 16.2315 16.2315C16.4034 16.0596 16.5 15.8264 16.5 15.5833C16.5 15.3402 16.4034 15.1071 16.2315 14.9352C16.0596 14.7632 15.8264 14.6667 15.5833 14.6667C15.3402 14.6667 15.1071 14.7632 14.9352 14.9352C14.7632 15.1071 14.6667 15.3402 14.6667 15.5833C14.6667 15.8264 14.7632 16.0596 14.9352 16.2315C15.1071 16.4034 15.3402 16.5 15.5833 16.5ZM11.9167 11.9167C11.9167 12.1598 11.8201 12.3929 11.6482 12.5648C11.4763 12.7368 11.2431 12.8333 11 12.8333C10.7569 12.8333 10.5237 12.7368 10.3518 12.5648C10.1799 12.3929 10.0833 12.1598 10.0833 11.9167C10.0833 11.6736 10.1799 11.4404 10.3518 11.2685C10.5237 11.0966 10.7569 11 11 11C11.2431 11 11.4763 11.0966 11.6482 11.2685C11.8201 11.4404 11.9167 11.6736 11.9167 11.9167ZM11.9167 15.5833C11.9167 15.8264 11.8201 16.0596 11.6482 16.2315C11.4763 16.4034 11.2431 16.5 11 16.5C10.7569 16.5 10.5237 16.4034 10.3518 16.2315C10.1799 16.0596 10.0833 15.8264 10.0833 15.5833C10.0833 15.3402 10.1799 15.1071 10.3518 14.9352C10.5237 14.7632 10.7569 14.6667 11 14.6667C11.2431 14.6667 11.4763 14.7632 11.6482 14.9352C11.8201 15.1071 11.9167 15.3402 11.9167 15.5833ZM6.41667 12.8333C6.65978 12.8333 6.89294 12.7368 7.06485 12.5648C7.23676 12.3929 7.33333 12.1598 7.33333 11.9167C7.33333 11.6736 7.23676 11.4404 7.06485 11.2685C6.89294 11.0966 6.65978 11 6.41667 11C6.17355 11 5.94039 11.0966 5.76849 11.2685C5.59658 11.4404 5.5 11.6736 5.5 11.9167C5.5 12.1598 5.59658 12.3929 5.76849 12.5648C5.94039 12.7368 6.17355 12.8333 6.41667 12.8333ZM6.41667 16.5C6.65978 16.5 6.89294 16.4034 7.06485 16.2315C7.23676 16.0596 7.33333 15.8264 7.33333 15.5833C7.33333 15.3402 7.23676 15.1071 7.06485 14.9352C6.89294 14.7632 6.65978 14.6667 6.41667 14.6667C6.17355 14.6667 5.94039 14.7632 5.76849 14.9352C5.59658 15.1071 5.5 15.3402 5.5 15.5833C5.5 15.8264 5.59658 16.0596 5.76849 16.2315C5.94039 16.4034 6.17355 16.5 6.41667 16.5Z"
                            fill="#2F56DE"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.41665 1.60413C6.59898 1.60413 6.77385 1.67656 6.90278 1.80549C7.03171 1.93442 7.10415 2.10929 7.10415 2.29163V2.99104C7.71098 2.97913 8.37923 2.97913 9.11439 2.97913H12.8846C13.6207 2.97913 14.289 2.97913 14.8958 2.99104V2.29163C14.8958 2.10929 14.9682 1.93442 15.0972 1.80549C15.2261 1.67656 15.401 1.60413 15.5833 1.60413C15.7656 1.60413 15.9405 1.67656 16.0694 1.80549C16.1984 1.93442 16.2708 2.10929 16.2708 2.29163V3.04971C16.5091 3.06804 16.7346 3.09096 16.9482 3.11938C18.0226 3.26421 18.8925 3.56854 19.5791 4.25421C20.2647 4.94079 20.5691 5.81071 20.7139 6.88504C20.8541 7.93004 20.8541 9.26379 20.8541 10.9486V12.8846C20.8541 14.5695 20.8541 15.9041 20.7139 16.9482C20.5691 18.0225 20.2647 18.8925 19.5791 19.579C18.8925 20.2647 18.0226 20.569 16.9482 20.7139C15.9032 20.8541 14.5695 20.8541 12.8846 20.8541H9.11623C7.43139 20.8541 6.09673 20.8541 5.05265 20.7139C3.97831 20.569 3.10839 20.2647 2.42181 19.579C1.73615 18.8925 1.43181 18.0225 1.28698 16.9482C1.14673 15.9032 1.14673 14.5695 1.14673 12.8846V10.9486C1.14673 9.26379 1.14673 7.92913 1.28698 6.88504C1.43181 5.81071 1.73615 4.94079 2.42181 4.25421C3.10839 3.56854 3.97831 3.26421 5.05265 3.11938C5.26623 3.09096 5.49264 3.06804 5.73006 3.04971V2.29163C5.73006 2.10945 5.80237 1.93472 5.9311 1.80581C6.05983 1.67691 6.23447 1.60437 6.41665 1.60413ZM5.23415 4.48246C4.3129 4.60621 3.78123 4.83904 3.39348 5.22679C3.00573 5.61454 2.7729 6.14621 2.64915 7.06838C2.62806 7.22421 2.61065 7.38921 2.59598 7.56246H19.404C19.3893 7.38829 19.3719 7.22421 19.3508 7.06746C19.2271 6.14621 18.9942 5.61454 18.6065 5.22679C18.2187 4.83904 17.6871 4.60621 16.7649 4.48246C15.8235 4.35596 14.5814 4.35413 12.8333 4.35413H9.16664C7.41856 4.35413 6.1774 4.35596 5.23415 4.48246ZM2.52081 11C2.52081 10.2171 2.52081 9.53604 2.53273 8.93746H19.4672C19.4791 9.53604 19.4791 10.2171 19.4791 11V12.8333C19.4791 14.5814 19.4773 15.8235 19.3508 16.7658C19.2271 17.687 18.9942 18.2187 18.6065 18.6065C18.2187 18.9942 17.6871 19.227 16.7649 19.3508C15.8235 19.4773 14.5814 19.4791 12.8333 19.4791H9.16664C7.41856 19.4791 6.1774 19.4773 5.23415 19.3508C4.3129 19.227 3.78123 18.9942 3.39348 18.6065C3.00573 18.2187 2.7729 17.687 2.64915 16.7649C2.52265 15.8235 2.52081 14.5814 2.52081 12.8333V11Z"
                            fill="#2F56DE"
                          />
                        </svg>
                      }
                    />
                  </Flex>
                </Flex>
                <Flex vertical className="input-container">
                  <label htmlFor="input-field" className="input-label">
                    Description
                  </label>
                  <TextArea
                    value={description}
                    name="description"
                    className="input-field"
                    placeholder="Type name"
                    onChange={handleChange}
                  />
                </Flex>
                <Flex vertical className="input-container">
                  <label htmlFor="input-field" className="input-label">
                    Labels
                  </label>
                  <Flex gap="4px 0" wrap>
                    {tags.map<React.ReactNode>((tag, index) => {
                      const isLongTag = tag.length > 20;
                      const tagElem = (
                        <Tag
                          key={tag.tagName}
                          closable={index !== -1}
                          style={{
                            userSelect: "none",
                            backgroundColor: tag.tagColor,
                            borderRadius: 1000,
                            color: tag.tagTextColor,
                          }}
                          onClose={() => handleCloseLabel(tag)}
                        >
                          <span>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag.tagName}
                          </span>
                        </Tag>
                      );
                      return isLongTag ? (
                        <Tooltip title={tag.tagName} key={tag.tagName}>
                          {tagElem}
                        </Tooltip>
                      ) : (
                        tagElem
                      );
                    })}
                    <Tag
                      style={tagPlusStyle}
                      icon={<PlusOutlined />}
                      onClick={() => setModalTagVisible(true)}
                    >
                      Add Label
                    </Tag>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Modal
        title="Create tag"
        open={modalTagVisible}
        onCancel={() => setModalTagVisible(false)}
        onOk={() => handleTagModalConfirm()}
      >
        <Flex vertical gap={15}>
          <label htmlFor="input-field" className="input-label">
            Tag name
          </label>
          <Input
            type="text"
            placeholder="Type name"
            className="input-field"
            value={inputLabelValue}
            name={"tagName"}
            onChange={handleInputLabelChange}
          />
          <label htmlFor="input-field" className="input-label">
            Tag background color
          </label>
          <ColorPicker
            defaultValue="#1677ff"
            value={tagColor}
            showText
            onChangeComplete={(value) => setTagColor(value.toHexString())}
          />
          <label htmlFor="input-field" className="input-label">
            Tag name color
          </label>
          <ColorPicker
            defaultValue="#000000"
            value={tagTextColor}
            showText
            onChangeComplete={(value) => setTagTextColor(value.toHexString())}
          />
        </Flex>
      </Modal>
    </>
  );
};

export default CreateTaskPage;
