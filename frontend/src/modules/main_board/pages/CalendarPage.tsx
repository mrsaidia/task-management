import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./MainBoardPage.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Affix, Button, Card, Flex, Spin } from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Calendar, Views, dayjsLocalizer } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import TaskService from "../../../../api/TaskService";
import { HttpStatusCode } from "axios";
import TaskStatus from "../../../../constants/TaskEnum";
import CustomEventComponent from "../components/CalendarCustomEventComponent";
import CustomEventWrapper from "../components/CalendarCustomEventWrapper";

const CalendarPage = () => {
  let navigate = useNavigate();
  const djLocalizer = dayjsLocalizer(dayjs);
  const today = new Date();
  const [listTask, setListTask] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const callOnce = useRef(true);
  const [getRequestParams, setGetRequestParams] = useState({
    startDate: Date.parse(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ).toDateString()
    ),
    endDate: Date.parse(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).toDateString()
    ),
  });

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: "lightblue",
      },
    });

  const { components, defaultDate, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
        event: CustomEventComponent,
        eventWrapper: CustomEventWrapper
      },
      defaultDate: today,
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  useEffect(() => {
    if (callOnce.current) {
      getTasks(getRequestParams);
      callOnce.current = false;
    }
  }, []);

  useEffect(() => {
    if (isFetching) {
      getTasks(getRequestParams);
    }
  }, [isFetching]);

  function getTasks(requestParams) {
    setLoading(true);
    TaskService.getTaskByMonth(requestParams).then((result) => {
      setLoading(false);
      if (result.status === HttpStatusCode.Ok) {
        let listNewData: any = [];
        result.data["tasks"].forEach((element) => {
          listNewData.push({
            title: element["name"],
            start: dayjs(element["start_date"]).toDate(),
            end: dayjs(element["due_date"]).toDate(),
            status: element["status"],
          });
        });
        setListTask(listNewData);
        setIsFetching(false);
      }
    });
  }

  const onNavigate = useCallback(
    (newDate) => {
      setGetRequestParams({
        startDate: Date.parse(
          new Date(newDate.getFullYear(), newDate.getMonth(), 1).toDateString()
        ),
        endDate: Date.parse(
          new Date(
            newDate.getFullYear(),
            newDate.getMonth() + 1,
            0
          ).toDateString()
        ),
      });
      getTasks(getRequestParams);
    },
    [setGetRequestParams]
  );

  return (
    <>
      <Spin
        spinning={loading}
        fullscreen
        indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
      />
      <Calendar
        components={components}
        defaultDate={defaultDate}
        events={listTask}
        localizer={djLocalizer}
        onNavigate={onNavigate}
        showMultiDayTimes
        step={60}
        views={views}
      />
    </>
  );
};

export default CalendarPage;
