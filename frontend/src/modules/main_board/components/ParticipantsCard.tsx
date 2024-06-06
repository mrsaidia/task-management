import React from "react";
import "./ParticipantsCard.css";
import { Avatar, Button, Flex, Tooltip } from "antd";
import {
  AntDesignOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";

const ParticipantsCard = () => {
  return (
    <Flex vertical gap="small" className="participants-card">
      <span className="participants">Participants</span>
      <Flex justify="space-between" align="center">
        <Avatar.Group
          maxCount={2}
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
          <Avatar
            style={{
              backgroundColor: "#f56a00",
            }}
          >
            K
          </Avatar>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{
              backgroundColor: "#1677ff",
            }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
        <Button shape="circle" icon={<PlusOutlined />} />
      </Flex>
    </Flex>
  );
};

export default ParticipantsCard;
