"use client";
import Image from "next/image";
import React from "react";
import { format } from "date-fns"; // Import format từ date-fns
import LableValue from "@/components/header/LableValue";
import MyButton from "@/components/shared/MyButton";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { ReportResponseDTO, UserInfor } from "@/dtos/ReportDTO";

type User = {
  id: number;
  fullname: string;
  gender: string;
  address: string;
  nickName: string;
  gmail: string;
  phone: string;
  status: number; // Trạng thái người dùng (ví dụ: 'active', 'inactive')
  job: string; // Nghề nghiệp
  bio: string; // Giới thiệu về bản thân
  hobbies: string[]; // Sở thích (danh sách)
  enrolled: Date; // Ngày tham gia (đăng ký)
};

const PostedUser = ({ item }: { item: UserInfor }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/user/${item.id}`);
  };

  return (
    <div className="flex w-full  flex-col pb-4 ">
      <div className="flex w-full gap-24 p-4 pt-8">
        <div
          className="self-center rounded-[10px]"
          style={{
            width: "115px",
            height: "130px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/assets/images/62ceabe8a02e045a0793ec431098bcc1.jpg"
            alt="background"
            layout="fill" // Lấp đầy khung
            objectFit="cover" // Cắt ảnh để phù hợp với khung
          />
        </div>
        <div className="flex flex-col self-center ">
          <LableValue
            label="Fullname"
            value={`${item.firstName} ${item.lastName}`}
          />
          <LableValue label="Date of birth" value={format(item.dob, "PPP")} />
          <LableValue label="Gender" value={item.gender ? "Male" : "Female"} />
        </div>
        <div className="flex flex-col self-center">
          <LableValue label="ID" value={item.id.toString()} />
          <LableValue label="Email" value={item.email} />
          <LableValue label="Phone Number" value={item.phoneNumber} />
        </div>
      </div>
      <div className="self-start px-4">
        <MyButton
          title="See detail"
          icon={faEye}
          backgroundColor="bg-primary-100"
          color="text-white"
          width="w-[117px]"
          height="h-[35px]"
          fontSize="text-[14px]"
          onClick={handleNavigate}
        />
      </div>
    </div>
  );
};

export default PostedUser;
