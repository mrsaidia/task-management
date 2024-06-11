import { ExclamationCircleFilled, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  DatePicker,
  Drawer,
  Flex,
  Input,
  InputRef,
  Modal,
  Select,
  Tag,
  Tooltip,
  Image,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./DetailTaskCard.css";
import dayjs from "dayjs";
import TaskStatus from "../../../../constants/TaskEnum";
import TextArea from "antd/es/input/TextArea";
import TaskService from "../../../../api/TaskService";
import { HttpStatusCode } from "axios";
import DefaultDateFormat from "../../../../constants/DateFormat";

const DetailTaskCard = ({ task, onSaveOrDelete }) => {
  const tags: any[] = JSON.parse(task.tag);
  const [isTaskNameEdit, setIsTaskNameEdit] = useState(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const [isDisableSaveTask, setIsDisableSaveTask] = useState(false);

  const [inputValue, setInputValue] = useState({
    id: task._id.$oid,
    name: task.name,
    status: task.status,
    dueDate: task.due_date,
    description: task.description,
  });
  const { name, description } = inputValue;
  const taskNameInputRef = useRef<InputRef>(null);
  const taskDescriptionInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isDescriptionEdit) {
      taskDescriptionInputRef.current?.focus();
    }
  }, [isDescriptionEdit]);

  useEffect(() => {
    if (isTaskNameEdit) {
      taskNameInputRef.current?.focus();
    }
  }, [isTaskNameEdit]);

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

  const handleDueDateChange = (date) => {
    setInputValue((prev) => ({
      ...prev,
      dueDate: dayjs(date).valueOf(),
    }));
  };

  const onSaveTaskClick = () => {
    setIsDisableSaveTask(true);
    TaskService.updateTask(inputValue).then((result) => {
      if (result.status === HttpStatusCode.Ok) {
        onSaveOrDelete();
        const modal = Modal.confirm({
          icon: null,
          title: null,
          content: (
            <Flex gap={20} justify="center" vertical>
              <Image src="/Done.png" preview={false}></Image>
              <p className="modal-title">Success Update Task!</p>
              <p className="modal-description">
                Your task has been updated, continue using the application
              </p>
            </Flex>
          ),
          footer: (
            <Button
              className="modal-confirm-btn"
              onClick={() => {
                setIsDisableSaveTask(false);
                modal.destroy();
              }}
            >
              Continue
            </Button>
          ),
        });
      }
    });
  };

  const showDeleteModalConfirm = () => {
    Modal.confirm({
      title: 'Delete task',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure delete this task?',
      onOk() {
        onDeleteTaskClick();
      },
    })
  } 

  const onDeleteTaskClick = () => {
    setIsDisableSaveTask(true);
    TaskService.deleteTask(inputValue.id).then((result) => {
      if (result.status === HttpStatusCode.Ok) {
        onSaveOrDelete();
        const modal = Modal.confirm({
          icon: null,
          title: null,
          content: (
            <Flex gap={20} justify="center" vertical>
              <Image src="/Done.png" preview={false}></Image>
              <p className="modal-title">Success Delete Task!</p>
              <p className="modal-description">
                Your task has been deleted, continue using the application
              </p>
            </Flex>
          ),
          footer: (
            <Button
              className="modal-confirm-btn"
              onClick={() => {
                setIsDisableSaveTask(false);
                modal.destroy();
              }}
            >
              Continue
            </Button>
          ),
        });
      }
    });
  };

  return (
    <Flex vertical gap={25}>
      {isTaskNameEdit ? (
        <Input
          ref={taskNameInputRef}
          type="text"
          value={name}
          name="name"
          className="task-label"
          placeholder="Type name"
          onChange={handleChange}
          onBlur={() => setIsTaskNameEdit(false)}
        />
      ) : (
        <p className="task-label" onDoubleClick={() => setIsTaskNameEdit(true)}>
          {inputValue.name}
        </p>
      )}
      <Flex gap={50}>
        <Flex gap={10}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.36486 2.33246C8.85319 2.39996 8.22152 2.54496 7.32319 2.75246L6.29902 2.98912C5.54069 3.16412 5.01736 3.28579 4.61819 3.42246C4.23236 3.55496 4.01402 3.68496 3.84986 3.84996C3.68486 4.01412 3.55486 4.23246 3.42236 4.61829C3.28569 5.01746 3.16402 5.53996 2.98902 6.29912L2.75236 7.32246C2.54486 8.22162 2.39986 8.85329 2.33236 9.36496C2.26569 9.86329 2.28152 10.2008 2.36986 10.5075C2.45736 10.8141 2.62319 11.1083 2.94319 11.4958C3.27236 11.8941 3.72986 12.3533 4.38236 13.0058L5.90736 14.5308C7.03986 15.6633 7.84569 16.4675 8.53902 16.9958C9.21736 17.5141 9.71402 17.7083 10.2182 17.7083C10.7232 17.7083 11.219 17.5141 11.8982 16.9958C12.5907 16.4675 13.3974 15.6625 14.5299 14.53C15.6632 13.3966 16.4674 12.5908 16.9965 11.8983C17.5132 11.2191 17.7082 10.7233 17.7082 10.2183C17.7082 9.71412 17.514 9.21829 16.9957 8.53912C16.4674 7.84579 15.6624 7.03912 14.5299 5.90662L13.0049 4.38162C12.3532 3.72996 11.894 3.27246 11.4965 2.94329C11.1082 2.62329 10.814 2.45746 10.5074 2.36996C10.2007 2.28162 9.86236 2.26662 9.36486 2.33246ZM9.20236 1.09329C9.79986 1.01412 10.324 1.01662 10.8524 1.16829C11.3815 1.31996 11.8274 1.59579 12.2924 1.97912C12.7424 2.35079 13.2424 2.85079 13.8682 3.47662L15.4482 5.05662C16.5399 6.14829 17.4049 7.01329 17.9899 7.78162C18.5932 8.57079 18.959 9.33079 18.959 10.2183C18.959 11.1066 18.5932 11.8666 17.9907 12.6558C17.4049 13.4241 16.5407 14.2891 15.4482 15.3808L15.3815 15.4475C14.2899 16.5391 13.4249 17.4041 12.6565 17.9891C11.8674 18.5925 11.1065 18.9583 10.219 18.9583C9.33152 18.9583 8.57152 18.5925 7.78152 17.99C7.01402 17.4041 6.14902 16.54 5.05652 15.4475L3.47736 13.8666C2.85236 13.2416 2.35152 12.7408 1.97986 12.2916C1.59652 11.8258 1.32069 11.38 1.16902 10.8516C1.01736 10.3225 1.01486 9.79829 1.09402 9.20079C1.16986 8.62246 1.32986 7.93246 1.52819 7.07079L1.77819 5.98496C1.94486 5.26579 2.07986 4.67912 2.24069 4.21162C2.40902 3.72246 2.61986 3.31162 2.96652 2.96496C3.31319 2.61829 3.72486 2.40662 4.21319 2.23996C4.68069 2.07829 5.26736 1.94329 5.98652 1.77746L7.07236 1.52746C7.93402 1.32746 8.62402 1.16996 9.20236 1.09329ZM7.90819 6.66246C7.71281 6.46708 7.44783 6.35732 7.17152 6.35732C6.89522 6.35732 6.63023 6.46708 6.43486 6.66246C6.23948 6.85783 6.12972 7.12282 6.12972 7.39912C6.12972 7.67543 6.23948 7.94041 6.43486 8.13579C6.5316 8.23253 6.64644 8.30927 6.77284 8.36163C6.89924 8.41398 7.03471 8.44093 7.17152 8.44093C7.30834 8.44093 7.44381 8.41398 7.5702 8.36163C7.6966 8.30927 7.81145 8.23253 7.90819 8.13579C8.00493 8.03905 8.08167 7.9242 8.13402 7.79781C8.18638 7.67141 8.21333 7.53594 8.21333 7.39912C8.21333 7.26231 8.18638 7.12684 8.13402 7.00044C8.08167 6.87405 8.00493 6.7592 7.90819 6.66246ZM5.55152 5.77912C5.7638 5.56398 6.01654 5.39296 6.29519 5.27589C6.57383 5.15883 6.87288 5.09804 7.17512 5.09703C7.47736 5.09602 7.77681 5.1548 8.05623 5.26999C8.33566 5.38519 8.58954 5.55452 8.80325 5.76823C9.01697 5.98195 9.18629 6.23582 9.30149 6.51525C9.41668 6.79467 9.47546 7.09413 9.47445 7.39636C9.47344 7.6986 9.41265 7.99765 9.29559 8.2763C9.17852 8.55494 9.0075 8.80768 8.79236 9.01996C8.36248 9.44983 7.77945 9.69133 7.17152 9.69133C6.56359 9.69133 5.98056 9.44983 5.55069 9.01996C5.12082 8.59009 4.87932 8.00706 4.87932 7.39912C4.87932 6.79119 5.12082 6.20816 5.55069 5.77829M15.8749 9.15829C15.9919 9.27548 16.0576 9.43433 16.0576 9.59996C16.0576 9.76558 15.9919 9.92444 15.8749 10.0416L10.059 15.8583C9.94055 15.9687 9.78384 16.0288 9.62192 16.0259C9.46 16.0231 9.30552 15.9575 9.191 15.843C9.07649 15.7285 9.0109 15.574 9.00804 15.4121C9.00519 15.2501 9.06529 15.0934 9.17569 14.975L14.9907 9.15829C15.0487 9.10021 15.1176 9.05414 15.1935 9.02271C15.2694 8.99127 15.3507 8.97509 15.4328 8.97509C15.5149 8.97509 15.5962 8.99127 15.672 9.02271C15.7479 9.05414 15.8168 9.10021 15.8749 9.15829Z"
              fill="#989898"
            />
          </svg>
          <p className="information-label">General</p>
        </Flex>
        <Flex>
          {tags.map<React.ReactNode>((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag.tagName}
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  userSelect: "none",
                  backgroundColor: tag.tagColor,
                  borderRadius: 1000,
                  color: tag.tagTextColor,
                }}
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
        </Flex>
      </Flex>
      <Flex gap={50}>
        <Flex gap={10}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.83317 1.45825C5.99893 1.45825 6.1579 1.5241 6.27511 1.64131C6.39232 1.75852 6.45817 1.91749 6.45817 2.08325V2.71909C7.00984 2.70825 7.61734 2.70825 8.2865 2.70825H11.7132C12.3823 2.70825 12.9898 2.70825 13.5415 2.71909V2.08325C13.5415 1.91749 13.6074 1.75852 13.7246 1.64131C13.8418 1.5241 14.0007 1.45825 14.1665 1.45825C14.3323 1.45825 14.4912 1.5241 14.6084 1.64131C14.7257 1.75852 14.7915 1.91749 14.7915 2.08325V2.77242C15.0082 2.78909 15.2132 2.80992 15.4073 2.83575C16.384 2.96742 17.1748 3.24409 17.799 3.86742C18.4223 4.49159 18.699 5.28242 18.8307 6.25909C18.8723 6.57159 18.9007 6.91242 18.9198 7.28409C18.9653 7.40701 18.9709 7.54116 18.9357 7.66742C18.9582 8.33492 18.9582 9.09409 18.9582 9.95325V11.7133C18.9582 13.2449 18.9582 14.4583 18.8307 15.4074C18.699 16.3841 18.4223 17.1749 17.799 17.7991C17.1748 18.4224 16.384 18.6991 15.4073 18.8308C14.4573 18.9583 13.2448 18.9583 11.7132 18.9583H8.2865C6.75484 18.9583 5.5415 18.9583 4.59234 18.8308C3.61567 18.6991 2.82484 18.4224 2.20067 17.7991C1.57734 17.1749 1.30067 16.3841 1.169 15.4074C1.0415 14.4574 1.0415 13.2449 1.0415 11.7133V9.95325C1.0415 9.09409 1.0415 8.33492 1.064 7.66658C1.02923 7.54022 1.03506 7.40612 1.08067 7.28325C1.099 6.91242 1.12734 6.57159 1.169 6.25909C1.30067 5.28242 1.57734 4.49159 2.20067 3.86742C2.82484 3.24409 3.61567 2.96742 4.59234 2.83575C4.7865 2.80992 4.99234 2.78909 5.20817 2.77242V2.08325C5.20817 1.91749 5.27402 1.75852 5.39123 1.64131C5.50844 1.5241 5.66741 1.45825 5.83317 1.45825ZM2.30234 8.12492C2.2915 8.66909 2.2915 9.28825 2.2915 9.99992V11.6666C2.2915 13.2558 2.29317 14.3849 2.40817 15.2416C2.52067 16.0791 2.73234 16.5624 3.08484 16.9149C3.43734 17.2674 3.92067 17.4791 4.759 17.5916C5.61567 17.7066 6.744 17.7083 8.33317 17.7083H11.6665C13.2557 17.7083 14.3848 17.7066 15.2415 17.5916C16.079 17.4791 16.5623 17.2674 16.9148 16.9149C17.2673 16.5624 17.479 16.0791 17.5915 15.2408C17.7065 14.3849 17.7082 13.2558 17.7082 11.6666V9.99992C17.7082 9.28825 17.7082 8.66909 17.6973 8.12492H2.30234ZM17.6398 6.87492H2.35984C2.37317 6.71659 2.389 6.56742 2.40817 6.42492C2.52067 5.58742 2.73234 5.10409 3.08484 4.75159C3.43734 4.39909 3.92067 4.18742 4.759 4.07492C5.61567 3.95992 6.744 3.95825 8.33317 3.95825H11.6665C13.2557 3.95825 14.3848 3.95992 15.2415 4.07492C16.079 4.18742 16.5623 4.39909 16.9148 4.75159C17.2673 5.10409 17.479 5.58742 17.5915 6.42575C17.6107 6.56742 17.6265 6.71742 17.6398 6.87492ZM13.7498 13.1249C13.5841 13.1249 13.4251 13.1908 13.3079 13.308C13.1907 13.4252 13.1248 13.5842 13.1248 13.7499C13.1248 13.9157 13.1907 14.0747 13.3079 14.1919C13.4251 14.3091 13.5841 14.3749 13.7498 14.3749C13.9156 14.3749 14.0746 14.3091 14.1918 14.1919C14.309 14.0747 14.3748 13.9157 14.3748 13.7499C14.3748 13.5842 14.309 13.4252 14.1918 13.308C14.0746 13.1908 13.9156 13.1249 13.7498 13.1249ZM11.8748 13.7499C11.8748 13.5037 11.9233 13.2599 12.0176 13.0324C12.1118 12.8049 12.2499 12.5982 12.424 12.4241C12.5981 12.25 12.8048 12.1119 13.0323 12.0176C13.2598 11.9234 13.5036 11.8749 13.7498 11.8749C13.9961 11.8749 14.2399 11.9234 14.4674 12.0176C14.6949 12.1119 14.9016 12.25 15.0757 12.4241C15.2498 12.5982 15.3879 12.8049 15.4821 13.0324C15.5763 13.2599 15.6248 13.5037 15.6248 13.7499C15.6248 14.2472 15.4273 14.7241 15.0757 15.0757C14.724 15.4274 14.2471 15.6249 13.7498 15.6249C13.2526 15.6249 12.7756 15.4274 12.424 15.0757C12.0724 14.7241 11.8748 14.2472 11.8748 13.7499Z"
              fill="#989898"
            />
          </svg>
          <p className="information-label">Due Date</p>
        </Flex>
        <DatePicker
          showTime
          format={DefaultDateFormat}
          variant="borderless"
          style={{ padding: 0 }}
          value={dayjs(inputValue.dueDate)}
          inputReadOnly
          allowClear={false}
          suffixIcon={null}
          onChange={handleDueDateChange}
        />
      </Flex>
      <Flex gap={50}>
        <Flex gap={10}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.40995 1.75675C8.08162 2.18508 7.71162 2.84675 7.17328 3.81175L6.90078 4.30091L6.85162 4.38925C6.60162 4.83925 6.38912 5.22091 6.04828 5.47925C5.70412 5.74092 5.28412 5.83508 4.79578 5.94508L4.70078 5.96675L4.17078 6.08675C3.12495 6.32341 2.41245 6.48591 1.92578 6.67841C1.44995 6.86508 1.34995 7.01925 1.31162 7.14175C1.27078 7.27175 1.26995 7.47091 1.55328 7.92258C1.84245 8.38091 2.32995 8.95258 3.04162 9.78592L3.40328 10.2084L3.46578 10.2809C3.80162 10.6726 4.08162 10.9992 4.20995 11.4126C4.33745 11.8234 4.29495 12.2542 4.24328 12.7776L4.23495 12.8751L4.17995 13.4392C4.07162 14.5492 3.99995 15.3142 4.02412 15.8642C4.04912 16.4142 4.16495 16.5659 4.25745 16.6359C4.33912 16.6984 4.49078 16.7667 4.98495 16.6251C5.48745 16.4817 6.15578 16.1759 7.13495 15.7251L7.63162 15.4967L7.72245 15.4551C8.17662 15.2442 8.56995 15.0626 8.99995 15.0626C9.42995 15.0626 9.82328 15.2442 10.2775 15.4542C10.3077 15.4688 10.3383 15.4827 10.3691 15.4959L10.865 15.7251C11.8441 16.1759 12.5125 16.4817 13.015 16.6251C13.5091 16.7667 13.6608 16.6984 13.7425 16.6359C13.835 16.5659 13.9508 16.4134 13.9758 15.8642C14.0008 15.3142 13.9275 14.5492 13.82 13.4392L13.765 12.8751L13.7566 12.7776C13.705 12.2542 13.6624 11.8234 13.7899 11.4126C13.9183 10.9992 14.1983 10.6726 14.5341 10.2809L14.5966 10.2084L14.9583 9.78592C15.67 8.95258 16.1574 8.38091 16.4458 7.92258C16.7299 7.47091 16.7291 7.27258 16.6883 7.14175C16.65 7.01925 16.55 6.86508 16.0741 6.67841C15.5866 6.48591 14.875 6.32341 13.8291 6.08675L13.2991 5.96675C13.2666 5.95841 13.235 5.95175 13.2041 5.94508C12.7158 5.83508 12.2958 5.74092 11.9516 5.47925C11.61 5.22091 11.3991 4.84008 11.1483 4.38925L11.1 4.30091L10.8266 3.81175C10.2883 2.84675 9.91828 2.18508 9.58995 1.75675C9.26245 1.32841 9.09495 1.29175 8.99995 1.29175C8.90495 1.29175 8.73745 1.32841 8.40995 1.75675ZM7.41828 0.996748C7.81412 0.478415 8.30495 0.041748 8.99995 0.041748C9.69495 0.041748 10.185 0.478415 10.5825 0.996748C10.9725 1.50675 11.3866 2.24925 11.8925 3.15675L12.1916 3.69258C12.5183 4.27925 12.6024 4.40425 12.7074 4.48425C12.8075 4.56008 12.9383 4.60342 13.5741 4.74758L14.1574 4.87925C15.1375 5.10091 15.945 5.28341 16.5324 5.51508C17.1425 5.75591 17.6766 6.11008 17.8825 6.77092C18.0858 7.42508 17.8575 8.02675 17.5041 8.58758C17.1608 9.13342 16.6124 9.77508 15.9424 10.5584L15.5466 11.0209C15.1158 11.5242 15.0258 11.6476 14.9833 11.7834C14.9408 11.9226 14.9441 12.0834 15.01 12.7542L15.0691 13.3692C15.1708 14.4159 15.2533 15.2692 15.2241 15.9192C15.195 16.5817 15.045 17.2167 14.4991 17.6317C13.9425 18.0534 13.2949 18.0067 12.6699 17.8267C12.0641 17.6534 11.3091 17.3059 10.3925 16.8834L9.84578 16.6318C9.24745 16.3568 9.11995 16.3126 8.99995 16.3126C8.87995 16.3126 8.75245 16.3568 8.15412 16.6318L7.60828 16.8834C6.69078 17.3059 5.93578 17.6534 5.32995 17.8267C4.70495 18.0059 4.05745 18.0534 3.50162 17.6317C2.95495 17.2167 2.80495 16.5817 2.77578 15.9201C2.74662 15.2701 2.82912 14.4159 2.93078 13.3701L2.99078 12.7542C3.05578 12.0826 3.05912 11.9226 3.01578 11.7834C2.97412 11.6476 2.88412 11.5251 2.45328 11.0209L2.05745 10.5584C1.38828 9.77508 0.839949 9.13342 0.496616 8.58842C0.142449 8.02675 -0.0858839 7.42508 0.117449 6.77092C0.323283 6.11008 0.857449 5.75591 1.46745 5.51508C2.05495 5.28341 2.86245 5.10091 3.84245 4.87925L3.89495 4.86758L4.42495 4.74758C5.06162 4.60342 5.19162 4.56008 5.29245 4.48341C5.39745 4.40425 5.48162 4.27925 5.80912 3.69258L6.10745 3.15675C6.61328 2.24841 7.02745 1.50675 7.41745 0.996748"
              fill="#989898"
            />
          </svg>

          <p className="information-label">Status</p>
        </Flex>
        <Select
          className="dropdown-status"
          style={{ height: 20 }}
          suffixIcon={null}
          defaultValue={inputValue.status}
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
      <Flex gap={50}>
        <Flex gap={10}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M14.0002 7.2915C14.2322 7.2915 14.4548 7.38369 14.6189 7.54779C14.783 7.71188 14.8752 7.93444 14.8752 8.1665V15.1665C14.8752 15.3986 14.783 15.6211 14.6189 15.7852C14.4548 15.9493 14.2322 16.0415 14.0002 16.0415C13.7681 16.0415 13.5455 15.9493 13.3814 15.7852C13.2174 15.6211 13.1252 15.3986 13.1252 15.1665V8.1665C13.1252 7.93444 13.2174 7.71188 13.3814 7.54779C13.5455 7.38369 13.7681 7.2915 14.0002 7.2915ZM14.0002 19.8332C14.3096 19.8332 14.6063 19.7103 14.8251 19.4915C15.0439 19.2727 15.1668 18.9759 15.1668 18.6665C15.1668 18.3571 15.0439 18.0603 14.8251 17.8415C14.6063 17.6228 14.3096 17.4998 14.0002 17.4998C13.6907 17.4998 13.394 17.6228 13.1752 17.8415C12.9564 18.0603 12.8335 18.3571 12.8335 18.6665C12.8335 18.9759 12.9564 19.2727 13.1752 19.4915C13.394 19.7103 13.6907 19.8332 14.0002 19.8332Z"
              fill="#989898"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.4585 14.0002C1.4585 7.07366 7.07366 1.4585 14.0002 1.4585C20.9267 1.4585 26.5418 7.07366 26.5418 14.0002C26.5418 20.9267 20.9267 26.5418 14.0002 26.5418C7.07366 26.5418 1.4585 20.9267 1.4585 14.0002ZM14.0002 3.2085C11.138 3.2085 8.39313 4.34547 6.3693 6.3693C4.34547 8.39313 3.2085 11.138 3.2085 14.0002C3.2085 16.8623 4.34547 19.6072 6.3693 21.631C8.39313 23.6549 11.138 24.7918 14.0002 24.7918C16.8623 24.7918 19.6072 23.6549 21.631 21.631C23.6549 19.6072 24.7918 16.8623 24.7918 14.0002C24.7918 11.138 23.6549 8.39313 21.631 6.3693C19.6072 4.34547 16.8623 3.2085 14.0002 3.2085Z"
              fill="#989898"
            />
          </svg>
          <p className="information-label">Description</p>
        </Flex>
        {isDescriptionEdit ? (
          <TextArea
            ref={taskDescriptionInputRef}
            value={description}
            name="description"
            className="input-field"
            placeholder="Type name"
            onChange={handleChange}
            onBlur={() => setIsDescriptionEdit(false)}
          />
        ) : (
          <p onDoubleClick={() => setIsDescriptionEdit(true)}>
            {inputValue.description}
          </p>
        )}
      </Flex>
      <Flex vertical gap={10}>
        <Button
          className="save-button"
          onClick={onSaveTaskClick}
          disabled={isDisableSaveTask}
        >
          Save
        </Button>
        <Button
          className="delete-button"
          onClick={() => showDeleteModalConfirm()}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );
};

export default DetailTaskCard;
