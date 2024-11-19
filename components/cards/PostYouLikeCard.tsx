import React from "react";
import Image from "next/image";
import { format } from "date-fns";

interface PostYouLike {
  _id: string;
  content: string;
  posterName: string;
  posterAva: string;
  like_at: Date;
}

const PostYouLikeCard = ({ postYouLike }: { postYouLike: PostYouLike }) => {
  return (
    <div className="mt-4 flex items-center justify-between gap-3 text-xs md:text-sm">
      <div className="flex flex-1 items-start gap-4 border-b border-gray-200 pb-3">
        <Image
          src={
            postYouLike.posterAva ||
            "https://i.pinimg.com/236x/3d/22/e2/3d22e2269593b9169e7d74fe222dbab0.jpg"
          } // Relative path with leading slash
          alt="Avatar"
          width={40}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex w-full flex-wrap gap-[2px] md:gap-1">
            <span className="font-medium">{postYouLike.posterName}</span>
            <span className="font-bold">thích</span> ảnh của{" "}
            <span className="font-medium">{postYouLike.posterName}</span>
          </div>
          <div className="max-h-10 w-full overflow-hidden">
            <span className="line-clamp-2 w-full text-[9px]">
              {postYouLike.content}
            </span>
          </div>
        </div>
        <p className="text-[10px]">{format(postYouLike.like_at, "HH:mm")}</p>
      </div>
    </div>
  );
};

export default PostYouLikeCard;
