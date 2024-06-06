import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Drawer, Flex, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import "./TaskCard.css";
import dayjs from "dayjs";
import DetailTaskCard from "./DetailTaskCard";
import DefaultDateFormat from "../../../../constants/DateFormat";

const TaskCard = ({ task, onSaveOrDelete }) => {
  const tags: any[] = JSON.parse(task.tag);
  const [openEditDrawer, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title="General"
        onClose={onClose}
        open={openEditDrawer}
        size="large"
      >
        <DetailTaskCard
          task={task}
          onSaveOrDelete={() => {
            onClose();
            onSaveOrDelete();
          }}
        ></DetailTaskCard>
      </Drawer>
      <Flex vertical gap="small" onClick={showDrawer} className="task">
        <span className="task-title">{task.name}</span>
        <Flex vertical={false} gap="small">
          {tags.map<React.ReactNode>((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag.tagName}
                style={{
                  fontSize: 9,
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
        <Flex gap="small" align="center" style={{ marginTop: 12 }}>
          <span className="date">
            {dayjs(task.start_date).format(DefaultDateFormat)}
          </span>
          <span className="date">
            {dayjs(task.due_date).format(DefaultDateFormat)}
          </span>
          <Avatar
            style={{
              backgroundColor: "#87d068",
            }}
            size={22}
            icon={<UserOutlined />}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default TaskCard;
