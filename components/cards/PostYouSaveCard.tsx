import React from "react";
import Image from "next/image";
import { format } from "date-fns";

interface PostYouLike {
  id: number;
  postContent: string;
  posterAva: string;
  posterName: string;
  like_at: Date;
}

const PostYouSaveCard = ({ postYouLike }: { postYouLike: PostYouLike }) => {
  return (
    <div className="mt-4  flex items-center justify-between text-xs ">
      <div className="flex w-full items-start gap-4 border-b border-gray-200 pb-3">
        <Image
          src={postYouLike.posterAva}
          alt="Avatar"
          width={60}
          height={50}
          className="rounded-md"
        />
        <div className="flex w-full flex-col gap-1 overflow-hidden">
          {/* <div className="overflow-hidden text-ellipsis pr-3">
            <span className="line-clamp-3 block text-xs font-semibold">
              {postYouLike.postContent}
            </span>
          </div> */}
          <div className="max-h-10 w-full overflow-hidden">
            <span className="line-clamp-2 w-full text-xs">
              {postYouLike.postContent}
            </span>
          </div>

          <div className="flex gap-1">
            <p className="whitespace-nowrap text-[10px] md:text-xs">
              Bài viết:
            </p>
            <p className="text-[9px] md:text-xs">{postYouLike.posterName}</p>
          </div>

          <div className="flex gap-1">
            <p className="whitespace-nowrap text-[10px] lg:text-xs">Đã lưu:</p>
            <p className="text-[9px] md:text-xs">
              {format(postYouLike.like_at, "HH:mm PPP")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostYouSaveCard;
