import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { format } from "date-fns";
import PostYouLikeCard from "../cards/PostYouLikeCard";
import { PostYouLikeDTO } from "@/dtos/PostDTO";

interface PostYouLike {
  id: number;
  user_id: number;
  post_id: number;
  created_at: Date;
  posts: {
    id: number;
    postContent: string;
    posterAva: string;
    posterName: string;
    like_at: Date;
  }[];
}

interface FavoritePose {
  onClose: () => void;
  post: PostYouLikeDTO[];
}

const Favorite = ({ onClose, post }: FavoritePose) => {
  // Hàm kiểm tra và phân tích ngày hợp lệ
  const parseDate = (date: any): Date | null => {
    const parsedDate = new Date(date);
    // Nếu ngày không hợp lệ, trả về null
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Background mờ - khi nhấn vào nền mờ thì đóng component */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="no-scrollbar text-dark100_light500 background-light700_dark300 relative z-10 mt-16 h-[50vh] w-[50vw] overflow-y-auto rounded-2xl shadow-lg">
        <div className="flex size-full flex-col">
          <div className="flex items-center justify-between px-4 py-2 pl-0">
            <span className="rounded-lg rounded-l-none bg-primary-100 p-2 px-4 text-center text-sm text-white ">
              Bài viết đã thích
            </span>
            <FontAwesomeIcon
              onClick={onClose}
              icon={faXmark}
              className="mb-2 cursor-pointer"
            />
          </div>
          {post.map((item) => (
            <div key={item._id} className="w-full px-4">
              <div className="flex w-full flex-col py-2">
                {/* Kiểm tra và hiển thị ngày tháng */}
                <p className="text-sm ">
                  {parseDate(item.created_at)
                    ? format(parseDate(item.created_at)!, "dd-MM-yyyy")
                    : "Ngày không hợp lệ"}
                </p>
                <div className="w-full">
                  {item.posts.map((it) => (
                    <PostYouLikeCard
                      key={`${item._id}-${it._id}`}
                      postYouLike={it}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
