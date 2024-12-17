import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import CommentMenu from "../forms/comment/Modal";
import ReplyCard from "./ReplyCard";
// import { createNotification } from "@/lib/services/notification.service";

const CommentCard = ({
  comment,
  setCommentsData,
  // profile,
  author,
  // postId,
  // mediaId,
}: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(comment?.likes.length);
  // const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
  //   null
  // );
  // const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const [showReplies, setShowReplies] = useState(false); // Trạng thái hiển thị replies
  const [replies, setReplies] = useState([]);
  // const [newComment, setNewComment] = useState("");

  const toggleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  useEffect(() => {
    let isMounted = true;
    try {
      if (isMounted) {
        setReplies(comment.replies);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
    return () => {
      isMounted = false;
    };
  }, [comment.replies]);

  function timeSinceMessage(timestamp: Date | string) {
    const now = new Date();
    const messageTimestamp = new Date(timestamp);
    const diffInMs = now.getTime() - messageTimestamp.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) return `${diffInDays} ngày`;
    if (diffInHours > 0) return `${diffInHours} giờ`;
    if (diffInMinutes > 0) return `${diffInMinutes} phút`;
    return `${diffInSeconds} giây`;
  }

  return (
    <div>
      <div className="flex">
        <Image
          src={comment.userId.avatar || "/assets/images/capy.jpg"}
          alt={comment.userId.avatar}
          width={40}
          height={40}
          className="size-11 rounded-full object-cover"
        />

        <div className="ml-3 flex-1">
          <p className="text-dark100_light500 font-bold">
            {comment.userId.firstName} {comment.userId.lastName}
          </p>
          <div className="flex">
            <p className="text-dark100_light500 inline-block rounded-r-lg rounded-bl-lg border p-2">
              {comment.content}
            </p>
            {/* <Icon
              icon="bi:three-dots"
              className="text-dark100_light500 ml-2 mt-3 hidden size-4 group-hover:inline"
              // onClick={() => handleOpenMenu(comment._id)}
            /> */}
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span className="mx-2 text-gray-600">
              {timeSinceMessage(comment.createAt)}
            </span>

            <div className="flex">
              <button
                className={`hover:underline ${
                  isLiked
                    ? "font-bold text-primary-100"
                    : "text-dark100_light500"
                }`}
                // onClick={toggleLike}
              >
                Like {numberOfLikes}
              </button>
            </div>

            <span className="mx-2">·</span>
            {/* <button
              className="text-dark100_light500 hover:underline"
              // onClick={() => setReplyingTo(comment._id)}
            >
              Reply
            </button> */}
          </div>

          {/* Input trả lời
          {replyingTo === comment._id && (
            <div className="mt-2 flex">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full rounded-md border bg-transparent p-2"
                placeholder="Write a reply..."
              />
              <button
                onClick={handleReplyComment}
                className="mx-2 mt-3 h-10 rounded-lg bg-primary-100 p-2 text-white hover:underline"
              >
                Reply
              </button>
              <button
                className="text-2xl text-primary-100"
                onClick={() => setReplyingTo(null)}
              >
                <Icon
                  icon="ic:round-close"
                  width="22"
                  height="22"
                  className="text-primary-100"
                />
              </button>
            </div>
          )} */}

          {replies?.length > 0 && (
            <p
              className="mb-1 cursor-pointer text-primary-100"
              onClick={toggleShowReplies}
            >
              Có {replies?.length} phản hồi
            </p>
          )}

          {showReplies &&
            replies?.map((reply: any) => (
              <div key={reply._id} className="group mb-3 flex items-start">
                <ReplyCard
                  reply={reply}
                  setReplies={setReplies}
                  // profile={profile}
                  commentId={comment._id}
                  author={author}
                  // postId={postId}
                  // mediaId={mediaId}
                />
              </div>
            ))}
        </div>

        {/* {selectedCommentId === comment._id && (
          <div ref={menuRef}>
            <CommentMenu
              commentUserId={comment.userId._id}
              commentId={comment._id}
              content={comment.content}
              setCommentsData={setCommentsData}
              handleCloseMenu={handleCloseMenu}
              postId={postId}
              mediaId={mediaId}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CommentCard;
