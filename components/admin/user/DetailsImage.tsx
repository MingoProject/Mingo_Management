import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import CommentCard from "@/components/cards/CommentCard";
import { getTimestamp } from "@/lib/utils";
import ImageAction from "./ImageAction";
import { getCommentByCommentId } from "@/lib/services/comment.service";
import CommentCard from "@/components/cards/CommentCard";

const DetailsImage = ({ image, onClose, profileUser }: any) => {
  const [commentsData, setCommentsData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchCommentsData = async () => {
      const detailsComments = await Promise.all(
        image?.comments.map(async (comment: any) => {
          return await getCommentByCommentId(comment);
        })
      );

      if (isMounted) {
        setCommentsData(detailsComments);
      }
    };

    if (image?.comments.length > 0) {
      fetchCommentsData();
    }
    return () => {
      isMounted = false;
    };
  }, [image?.comments]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-500/50">
      <div className="background-light700_dark300 text-dark100_light500 z-50 max-h-screen w-[90%] overflow-y-auto rounded-lg bg-white p-6 shadow-lg md:w-4/5 lg:w-[70%]">
        <div className="block lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="ml-4 mt-3 flex items-center">
              <div className="flex items-center">
                <Link href={`/profile/${profileUser._id}`}>
                  <Image
                    src={profileUser?.avatar || "/assets/images/capy.jpg"}
                    alt="Avatar"
                    width={45}
                    height={45}
                    className="size-11 rounded-full object-cover"
                  />
                </Link>
                <div>
                  <p className="text-dark100_light500 ml-3 text-base">
                    {profileUser?.firstName || ""}
                  </p>
                  <span className="text-dark100_light500 ml-3 text-sm">
                    {image?.createAt && getTimestamp(image?.createAt)}
                  </span>
                </div>
              </div>
              <div className="ml-auto pb-2 pr-4">
                <Icon
                  icon="tabler:dots"
                  className="text-dark100_light500 cursor-pointer"
                />
              </div>
            </div>
            <div className="mt-20 flex w-full items-center justify-center">
              <div className=" mx-auto flex h-64 w-full items-center justify-center">
                <Image
                  src={image?.url || "/assets/images/placeholder.jpg"}
                  alt="Image"
                  width={300}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="mx-10 my-5">
              <ImageAction
                likes={image?.likes}
                // mediaId={image?._id}
                comments={image?.comments}
                shares={image?.shares}
                // author={profileUser}
              />
              <hr className="background-light800_dark400 mt-2 h-px w-full border-0" />

              <div
                className=" my-4 h-80 overflow-y-scroll"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {commentsData.length > 0 ? (
                  commentsData.map(
                    (comment) =>
                      comment.parentId === null && (
                        <div
                          key={comment._id}
                          className="group mb-3 flex items-start"
                        >
                          <CommentCard
                            comment={comment}
                            setCommentsData={setCommentsData}
                            mediaId={image._id}
                          />
                        </div>
                      )
                  )
                ) : (
                  <p className="text-dark100_light500">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-end space-x-2">
          <Button className="bg-gray-300 text-black" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsImage;
