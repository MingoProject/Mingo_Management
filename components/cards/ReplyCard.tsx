import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getTimestamp } from "@/lib/utils";
import CommentMenu from "../forms/comment/Modal";
import { getCommentByCommentId } from "@/lib/services/comment.service";
// import { createNotification } from "@/lib/services/notification.service";

const ReplyCard = ({
  reply,
  setReplies,
  // profile,
  commentId,
  author,
  // postId,
  // mediaId,
}: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(reply?.likes.length);
  // const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
  //   null
  // );

  const [detailsComment, setDetailsComment] = useState<any>(null);
  // const [replyingTo, setReplyingTo] = useState<string | null>(null);
  // const [newComment, setNewComment] = useState("");
  const [parentComment, setParentComment] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDetailsComment = async () => {
      try {
        const details = await getCommentByCommentId(reply._id);
        if (isMounted) {
          setDetailsComment(details);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchDetailsComment();
    return () => {
      isMounted = false;
    };
  }, [reply._id]);

  useEffect(() => {
    let isMounted = true;
    const fetchDetailsComment = async () => {
      try {
        if (detailsComment?.parentId?._id) {
          const parent = await getCommentByCommentId(
            detailsComment?.parentId?._id
          );
          if (isMounted) {
            setParentComment(parent);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchDetailsComment();
    return () => {
      isMounted = false;
    };
  }, [detailsComment?.parentId?._id, parentComment]);

  return (
    <div>
      <div className="flex">
        <Image
          src={
            detailsComment?.userId?.avatar
              ? detailsComment.userId.avatar
              : "/assets/images/capy.jpg"
          }
          alt={detailsComment?.userId?.avatar || "Default avatar"}
          width={40}
          height={40}
          className="size-11 rounded-full object-cover"
        />

        <div className="ml-3 flex-1">
          <p className="text-dark100_light500 flex items-center space-x-2 font-bold">
            <span>
              {detailsComment?.userId?.firstName || ""}{" "}
              {detailsComment?.userId?.lastName || ""}
            </span>
            {parentComment && (
              <>
                <Icon icon="raphael:arrowright" />
                <span>
                  {parentComment.userId.firstName || ""}{" "}
                  {parentComment.userId.lastName || ""}
                </span>
              </>
            )}
          </p>
          <div className="flex">
            <p className="text-dark100_light500 inline-block rounded-r-lg rounded-bl-lg border p-2">
              {detailsComment?.content ? detailsComment.content : ""}
            </p>
            {/* <Icon
              icon="bi:three-dots"
              className="text-dark100_light500 ml-2 mt-3 hidden size-4 group-hover:inline"
              // onClick={() => handleOpenMenu(detailsComment?._id)}
            /> */}
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span className="text-gray-600">
              {detailsComment?.createAt
                ? getTimestamp(detailsComment.createAt)
                : ""}
            </span>

            <span className="mx-2 text-gray-600">·</span>

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
              onClick={() =>
                setReplyingTo(detailsComment?._id ? detailsComment._id : "")
              }
            >
              Reply
            </button> */}
          </div>
        </div>

        {/* {selectedCommentId === reply._id && (
          <div ref={menuRef}>
            <CommentMenu
              commentUserId={detailsComment.userId._id}
              commentId={detailsComment._id}
              content={detailsComment.content}
              setCommentsData={setReplies}
              handleCloseMenu={handleCloseMenu}
              postId={postId}
              mediaId={mediaId}
            />
          </div>
        )} */}
      </div>
      {/* {replyingTo === detailsComment?._id && (
        <div className="ml-10 mt-2 flex">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-52 rounded-md border bg-transparent p-2"
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
    </div>
  );
};

export default ReplyCard;
