import NotificationCard from "@/components/cards/NotificationCard";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Notification = ({ notifications }: any) => {
  return (
    <div className="flex h-64 w-full flex-col">
      <div className=" flex w-full flex-col gap-4 ">
        <p className="flex items-center gap-4 border-b border-gray-300 pb-1">
          <FontAwesomeIcon
            icon={faBell}
            className="text-dark100_light500 mb-2"
          />
          <span className="text-dark100_light500 text-[20px]">
            Recent notifications
          </span>
        </p>
        <div className=" no-scrollbar flex h-52 w-full flex-col gap-2 overflow-auto">
          {notifications.length > 0 ? (
            notifications.map((item: any) => (
              <NotificationCard
                notification={item}
                // content={item.content}
                // status={item.status}
                key={item.id}
              />
            ))
          ) : (
            <div className="mx-auto ">
              <Icon
                icon="material-symbols-light:list-alt-outline-rounded"
                width="40"
                height="40"
                className="text-dark100_light500 mx-auto"
              />
              <span className="text-dark100_light500 text-lg">
                No notifications
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
