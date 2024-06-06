import React, { useState } from "react";
import "./StatusContainer.css";
import { Avatar, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TaskCard from "./TaskCard";

const StatusContainer = ({ status, backgroundColor, titleColor, listTask, onSaveOrDelete }) => {
  const statusStyle = (bgColor, txtColor) => ({
    backgroundColor: bgColor,
    color: txtColor,
  });

  return (
    <Flex
      style={statusStyle(backgroundColor, titleColor)}
      className="status-container"
      vertical
      gap="middle"
    >
      <span className="status">{status}</span>
      {listTask.map((task) => {
        return (
          <TaskCard
            key = {task._id.$oid}
            task = {task}
            onSaveOrDelete={() => onSaveOrDelete()}
          >
          </TaskCard>
        )
      })}
    </Flex>
  );
};

export default StatusContainer;
