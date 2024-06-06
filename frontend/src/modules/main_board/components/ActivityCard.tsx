import { Divider, Flex } from "antd";
import React from "react";
import "./ActivityCard.css";

const ActivityCard = () => {
  return (
    <Flex className="activity-card" gap="small" justify="center" align="center">
      <Flex gap="small" vertical>
        <span className="activities">Activities</span>
        <Flex justify="start" align="center">
          <span className="percentage">5%</span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.0953 11.4286L16 5.33337M16 5.33337L9.8606 11.4286M16 5.33337V25.1429"
              stroke="#43CB5B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="to-prev-day-2b">
            To prev
            <br />
            day
          </span>
        </Flex>
      </Flex>
      <Divider type="vertical" className="divider" />
      <svg
        width="65"
        height="39"
        viewBox="0 0 65 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M64.5136 34.2833C64.9875 33.9996 65.1417 33.3855 64.858 32.9117C64.5743 32.4378 63.9602 32.2836 63.4864 32.5673L64.5136 34.2833ZM0.633564 1.93044C9.65658 5.48397 13.0438 13.8892 15.6736 22.0104C16.9646 25.9969 18.0934 29.9844 19.6576 33.0253C21.2399 36.1012 23.4 38.4737 26.8762 38.9073L27.1238 36.9226C24.6 36.6079 22.8851 34.9273 21.4361 32.1105C19.9691 29.2587 18.9104 25.514 17.5764 21.3942C14.9562 13.3027 11.3434 3.99879 1.36644 0.0695567L0.633564 1.93044ZM26.8762 38.9073C30.2361 39.3263 32.6944 38.1104 34.5898 36.1292C36.4277 34.2081 37.7554 31.5474 38.9633 29.0417C40.2056 26.4647 41.3201 24.0575 42.7477 22.3283C44.1262 20.6586 45.7007 19.7355 47.9013 19.9537L48.0987 17.9635C45.0493 17.6611 42.8738 19.0342 41.2054 21.055C39.5861 23.0163 38.3569 25.6939 37.1617 28.1732C35.9321 30.7238 34.7285 33.091 33.1446 34.7466C31.6181 36.3422 29.7639 37.2519 27.1238 36.9226L26.8762 38.9073ZM47.9013 19.9537C50.1977 20.1815 51.814 21.316 53.0945 22.9149C54.4035 24.5492 55.3243 26.621 56.2071 28.6629C56.6396 29.6634 57.0681 30.6665 57.5196 31.5504C57.969 32.4302 58.4757 33.2627 59.0943 33.9012C59.727 34.5543 60.5149 35.0417 61.4992 35.1313C62.4653 35.2192 63.4676 34.9095 64.5136 34.2833L63.4864 32.5673C62.6574 33.0635 62.0816 33.176 61.6805 33.1395C61.2976 33.1047 60.9293 32.921 60.5307 32.5096C60.118 32.0836 59.7185 31.4585 59.3007 30.6406C58.8851 29.827 58.4854 28.8927 58.0429 27.8693C57.1757 25.8635 56.159 23.5419 54.6555 21.6646C53.1235 19.7518 51.0523 18.2564 48.0987 17.9635L47.9013 19.9537Z"
          fill="url(#paint0_linear_0_195)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_0_195"
            x1="1"
            y1="19.9596"
            x2="64"
            y2="19.0404"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F1F5F9" stopOpacity="0" />
            <stop offset="0.16" stopColor="#DFFFE4" />
            <stop offset="0.501667" stopColor="#43CB5B" />
          </linearGradient>
        </defs>
      </svg>
    </Flex>
  );
};

export default ActivityCard;
