// import { dislikeMedia, likeMedia } from "@/lib/services/media.service";
// import { createNotification } from "@/lib/services/notification.service";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

const ImageAction = ({ likes, comments, shares }: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(likes?.length);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const isUserLiked = likes.some((like: any) => like._id === userId);
        setIsLiked(isUserLiked);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [likes]);

  return (
    <div>
      <div className="text-dark100_light500 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon
            // onClick={toggleLike}
            icon={
              isLiked ? "ic:baseline-favorite" : "ic:baseline-favorite-border"
            }
            className={isLiked ? "text-primary-100" : "text-dark100_light500"}
          />
          <span className="text-dark100_light500">{numberOfLikes} Likes</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon
            icon="mingcute:message-4-line"
            className="text-dark100_light500"
          />
          <span className="text-dark100_light500">
            {comments?.length} Comments
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon icon="mdi:share-outline" className="text-dark100_light500" />
          <span className="text-dark100_light500">{shares?.length} Shares</span>
        </div>
      </div>
    </div>
  );
};

export default ImageAction;
