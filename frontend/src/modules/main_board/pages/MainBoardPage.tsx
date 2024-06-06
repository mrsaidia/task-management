import React, { useEffect, useRef, useState } from "react";
import "./MainBoardPage.css";
import { Affix, Button, Card, Flex, Spin } from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import ParticipantsCard from "../components/ParticipantsCard";
import TimeCard from "../components/TimeCard";
import ActivityCard from "../components/ActivityCard";
import StatusContainer from "../components/StatusContainer";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import TaskService from "../../../../api/TaskService";
import { HttpStatusCode } from "axios";
import TaskStatus from "../../../../constants/TaskEnum";

const MainBoardPage = () => {
  let navigate = useNavigate();
  const [listTask, setListTask] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const callOnce = useRef(true);
  const [getRequestParams, setGetRequestParams] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (callOnce.current) {
      getTasks(getRequestParams);
      callOnce.current = false;
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isFetching) {
      getTasks(getRequestParams);
    }
  }, [isFetching]);
  
  function onScroll() {
    if (
      window.innerHeight + Math.round(document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight
    ) {
      setIsFetching(true);
    }
  }

  function getTasks(requestParams) {
    setLoading(true);
    TaskService.getTaskPagination(requestParams).then((result) => {
      setLoading(false);
      if (result.status === HttpStatusCode.Ok) {
        setListTask((oldListTask) =>
          oldListTask.concat(result.data["tasks"])
        );
        setIsFetching(false);
        setGetRequestParams((prev) => ({ ...prev, page: prev.page++ }));
      }
    });    
  }

  function onSaveOrDelete() {
    setListTask([]);
    setGetRequestParams({page: 1, limit: 10});
    getTasks({page: 1, limit: 10});
  }

  return (
    <>
      <Spin
        spinning={loading}
        fullscreen
        indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
      />
      <Flex vertical gap="small">
        <Affix offsetTop={64}>
          <Flex className="sticky-board-title">
            <Flex
              className="board-title"
              justify="space-between"
              align="center"
            >
              <div className="title-text">Boards</div>
              <Flex gap="small" align="center" justify="center">
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => {
                    return navigate("/create_task");
                  }}
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
                  Add Task
                </Button>
                <Button
                  type="text"
                  shape="round"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.1667 2.70837C14.3324 2.70837 14.4914 2.77422 14.6086 2.89143C14.7258 3.00864 14.7917 3.16761 14.7917 3.33337V14.7917L16.1667 12.9584C16.2159 12.8927 16.2776 12.8374 16.3482 12.7956C16.4189 12.7538 16.497 12.7263 16.5783 12.7147C16.6595 12.703 16.7423 12.7076 16.8218 12.7279C16.9013 12.7483 16.976 12.7841 17.0417 12.8334C17.1073 12.8826 17.1627 12.9443 17.2045 13.0149C17.2463 13.0856 17.2738 13.1637 17.2854 13.245C17.297 13.3262 17.2925 13.409 17.2721 13.4885C17.2518 13.568 17.2159 13.6427 17.1667 13.7084L14.6667 17.0417C14.588 17.1466 14.4782 17.2242 14.353 17.2633C14.2278 17.3024 14.0935 17.3011 13.969 17.2596C13.8446 17.2182 13.7364 17.1386 13.6597 17.0322C13.583 16.9257 13.5417 16.7979 13.5417 16.6667V3.33337C13.5417 3.16761 13.6075 3.00864 13.7247 2.89143C13.8419 2.77422 14.0009 2.70837 14.1667 2.70837ZM6.04168 5.00004C6.04168 4.83428 6.10752 4.67531 6.22474 4.5581C6.34195 4.44089 6.50092 4.37504 6.66668 4.37504H10.8333C10.9991 4.37504 11.1581 4.44089 11.2753 4.5581C11.3925 4.67531 11.4583 4.83428 11.4583 5.00004C11.4583 5.1658 11.3925 5.32477 11.2753 5.44198C11.1581 5.55919 10.9991 5.62504 10.8333 5.62504H6.66668C6.50092 5.62504 6.34195 5.55919 6.22474 5.44198C6.10752 5.32477 6.04168 5.1658 6.04168 5.00004ZM4.37501 9.16671C4.37501 9.00095 4.44086 8.84198 4.55807 8.72477C4.67528 8.60756 4.83425 8.54171 5.00001 8.54171H10.8333C10.9991 8.54171 11.1581 8.60756 11.2753 8.72477C11.3925 8.84198 11.4583 9.00095 11.4583 9.16671C11.4583 9.33247 11.3925 9.49144 11.2753 9.60865C11.1581 9.72586 10.9991 9.79171 10.8333 9.79171H5.00001C4.83425 9.79171 4.67528 9.72586 4.55807 9.60865C4.44086 9.49144 4.37501 9.33247 4.37501 9.16671ZM2.70834 13.3334C2.70834 13.1676 2.77419 13.0086 2.8914 12.8914C3.00861 12.7742 3.16758 12.7084 3.33334 12.7084H10.8333C10.9991 12.7084 11.1581 12.7742 11.2753 12.8914C11.3925 13.0086 11.4583 13.1676 11.4583 13.3334C11.4583 13.4991 11.3925 13.6581 11.2753 13.7753C11.1581 13.8925 10.9991 13.9584 10.8333 13.9584H3.33334C3.16758 13.9584 3.00861 13.8925 2.8914 13.7753C2.77419 13.6581 2.70834 13.4991 2.70834 13.3334Z"
                        fill="inherit"
                      />
                    </svg>
                  }
                >
                  Sort
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Affix>

        <Flex justify="space-between">
          <ParticipantsCard />
          <TimeCard />
          <ActivityCard />
        </Flex>
        <Flex gap="middle">
          <StatusContainer
            listTask={listTask.filter(
              (element) => element.status === TaskStatus.ToDo
            )}
            status="To do"
            backgroundColor="#FDF8EA"
            titleColor="#EFC247"
            onSaveOrDelete={() => onSaveOrDelete()}
          />
          <StatusContainer
            listTask={listTask.filter(
              (element) => element.status === TaskStatus.InProgress
            )}
            status="In Progress"
            backgroundColor="#F0F0FF"
            titleColor="#1010D5"
            onSaveOrDelete={() => onSaveOrDelete()}
          />
          <StatusContainer
            listTask={listTask.filter(
              (element) => element.status === TaskStatus.OnApproval
            )}
            status="On Approval"
            backgroundColor="#E6FEEB"
            titleColor="#43CB5B"
            onSaveOrDelete={() => onSaveOrDelete()}
          />
          <StatusContainer
            listTask={listTask.filter(
              (element) => element.status === TaskStatus.Completed
            )}
            status="Completed"
            backgroundColor="#FAEDF5"
            titleColor="#D2399C"
            onSaveOrDelete={() => onSaveOrDelete()}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default MainBoardPage;
