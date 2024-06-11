import React from "react";
import TaskStatus from "../../../../constants/TaskEnum";

const CustomEventComponent = (eventWrapperProps) => {
    let backgroundColor = "";
    let color = "";
    switch (eventWrapperProps.event.status) {
      case TaskStatus.ToDo:
        backgroundColor = "#fdf8ea";
        color = "#EFC247";
        break;
      case TaskStatus.InProgress:
        backgroundColor = "#f0f0ff";
        color = "#1010D5";
        break;
      case TaskStatus.OnApproval:
        backgroundColor = "#faedf5";
        color = "#D2399C";
        break;
      case TaskStatus.Completed:
        backgroundColor = "#e6feeb";
        color = "#43CB5B";
        break;
    }
    const style = {
      backgroundColor: backgroundColor,
      color: color,
      padding: "5px",
    };
    return <div style={style}>{eventWrapperProps.event.title}</div>;
  };

export default CustomEventComponent