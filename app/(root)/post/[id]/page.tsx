"use client";
import React, { useEffect, useState } from "react";
import { userData, posts } from "@/components/shared/data";
import HeaderWithButton from "@/components/header/HeaderWithButton";
import TilteIcon from "@/components/header/TilteIcon";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import PostedUser from "@/components/admin/content/PostedUser";
import PostInformation from "@/components/admin/content/PostInformation";
import { MangementPostResponseDTO } from "@/dtos/PostDTO";
import { fetchReport, UpdateStatusReport } from "@/lib/services/report.service";
import { deletePost, getManagementPostById } from "@/lib/services/post.service";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  const [isDetailPost, setIsDetailPost] = useState<MangementPostResponseDTO>();

  const fetchReportUser = async () => {
    try {
      const data = await getManagementPostById(id.toString());
      setIsDetailPost(data);
    } catch (error) {
      console.error("Error fetching report user", error);
    }
  };

  useEffect(() => {
    fetchReportUser();
  }, []); // Bỏ `isDetailPost` khỏi dependency array

  if (!isDetailPost) {
    return (
      <div className="w-[100%] h-screen items-center justify-center flex">
        <div className="loader"></div>
      </div>
    );
  }

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = {
        reportId: id,
        status: 1,
      };
      const rs = await deletePost(isDetailPost.postId, token);
      if (rs) {
        // Giả sử API trả về một thuộc tính `success` khi thành công

        alert("Xóa bài viết thành công!");
      } else {
        alert("Xóa bài viết thất bại. Vui lòng thử lại!");
      }

      console.log(rs);
    } catch (error) {
      console.error("Lỗi khi Xóa bài viết:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  return (
    <div className="text-dark100_light500 background-light700_dark400 flex size-full flex-col p-4">
      <HeaderWithButton title="Post Detail" type={4} onReject={handleConfirm} />
      <div className="w-full rounded-[10px] p-4 shadow-sm">
        <TilteIcon title="Posted User" icon={faAddressCard} />
        <PostedUser item={isDetailPost.userId} />
        <TilteIcon title="Post Information" icon={faAddressCard} />
        {isDetailPost ? (
          <PostInformation item={isDetailPost} />
        ) : (
          <div>Post not found</div>
        )}
      </div>
    </div>
  );
};

export default Page;
