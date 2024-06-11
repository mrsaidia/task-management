import React from "react";
import TaskStatus from "../../../../constants/TaskEnum";

const CustomEventWrapper = (eventWrapperProps) => {
    let backgroundColor = "";
    switch (eventWrapperProps.event.status) {
      case TaskStatus.ToDo:
        backgroundColor = "#fdf8ea";
        break;
      case TaskStatus.InProgress:
        backgroundColor = "#f0f0ff";
        break;
      case TaskStatus.OnApproval:
        backgroundColor = "#faedf5";
        break;
      case TaskStatus.Completed:
        backgroundColor = "#e6feeb";
        break;
    }
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "10px",
      padding: "5px",
    };
    return <div style={style}>{eventWrapperProps.event.title}</div>;
  };

export default CustomEventWrapper