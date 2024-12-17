import React from "react";
import Image from "next/image";

const NotificationCard = ({ notification }: { notification: any }) => {
  const renderContent = () => {
    switch (notification.type) {
      case "report_post":
        return (
          <p className="text-dark100_light500 font-light">
            {`${notification.senderId.firstName} ${notification.senderId.lastName}`}{" "}
            reported a post
          </p>
        );
      case "report_user":
        return (
          <p className="text-dark100_light500 font-light">
            {`${notification.senderId.firstName} ${notification.senderId.lastName}`}{" "}
            reported a user
          </p>
        );
      case "report_comment":
        return (
          <p className="text-dark100_light500 font-light">
            {`${notification.senderId.firstName} ${notification.senderId.lastName}`}{" "}
            reported a comment
          </p>
        );
      case "report_message":
        return (
          <p className="text-dark100_light500 font-light">
            {`${notification.senderId.firstName} ${notification.senderId.lastName}`}{" "}
            reported a message
          </p>
        );
      default:
        return <p></p>;
    }
  };

  return (
    <div className="flex h-12 w-full items-center justify-between rounded-[10px] border border-border-color px-4 py-2">
      <div className="flex w-full items-center">
        <Image
          src={
            notification.senderId.avatar
              ? notification.senderId.avatar
              : "/assets/images/capy.jpg"
          }
          alt="Avatar"
          width={50}
          height={50}
          className="size-16 rounded-full object-cover"
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default NotificationCard;
