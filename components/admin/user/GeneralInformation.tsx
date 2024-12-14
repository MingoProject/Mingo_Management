"use client";
import Image from "next/image";
import React from "react";
import { format } from "date-fns"; // Import format từ date-fns
import LableValue from "@/components/header/LableValue";

const GeneralInformation = ({ item }: any) => {
  return (
    <div className="flex w-full flex-col pt-4">
      <div
        className="self-center"
        style={{
          width: "837px",
          height: "177px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src={
            item?.background ||
            "https://i.pinimg.com/1200x/50/51/d4/5051d41e6bf1a0b3806f4ce4cc267cac.jpg"
          }
          alt="background"
          layout="fill" // Lấp đầy khung
          objectFit="cover" // Cắt ảnh để phù hợp với khung
        />
      </div>
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
            src={
              item?.avatar ||
              "https://i.pinimg.com/1200x/50/51/d4/5051d41e6bf1a0b3806f4ce4cc267cac.jpg"
            }
            alt="background"
            layout="fill" // Lấp đầy khung
            objectFit="cover" // Cắt ảnh để phù hợp với khung
          />
        </div>
        <div className="flex flex-col self-center ">
          <LableValue label="Fullname" value={item?.firstName} />
          {/* <LableValue
            label="Date of birth"
            value={format(item?.birthDay, "PPP")}
          /> */}
          <LableValue label="Gender" value={item?.gender ? "Female" : "Male"} />
        </div>
        <div className="flex flex-col self-center">
          <LableValue label="ID" value={item?._id} />
          <LableValue label="Email" value={item?.email} />
          <LableValue label="Phone Number" value={item?.phoneNumber} />
        </div>
      </div>
      <div className="flex flex-col p-4">
        <LableValue label="Address" value={item?.address} />
        <LableValue label="Nickname" value={item?.nickName} />
        {/* <LableValue
          label="Attend Date"
          value={format(item?.attendDate, "PPP")}
        /> */}
      </div>
    </div>
  );
};

export default GeneralInformation;
