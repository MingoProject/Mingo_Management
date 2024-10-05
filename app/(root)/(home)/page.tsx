"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import PostsCard from "@/components/cards/PostsCard";
import { Icon } from "@iconify/react";
import CreatePost from "@/components/forms/CreatePost";

const posts = [
  {
    id: 1,
    userName: "Huỳnh",
    userAvatar: "/assets/images/4d7b4220f336f18936a8c33a557bf06b.jpg",
    title: "Hôm nay ăn bún đậu",
    images: {
      id: 1,
      img1: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
      img2: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    },
    like: ["An", "Minh", "Lan"],
    comment: [
      { text: "Ngon quá!", user: "An" },
      { text: "Nhìn hấp dẫn quá", user: "Minh" },
      { text: "Muốn ăn thử!", user: "Lan" },
    ],
    createdAt: "2024-08-01T10:00:00Z",
  },
  {
    id: 2,
    userName: "Minh",
    userAvatar: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    title: "Trải nghiệm bún bò Huế",
    images: {
      id: 2,
      img1: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
      img2: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    },
    like: ["Huỳnh", "Linh"],
    comment: [
      { text: "Tuyệt vời!", user: "Huỳnh" },
      { text: "Nhìn rất ngon!", user: "Linh" },
    ],
    createdAt: "2024-08-02T12:30:00Z",
  },
  {
    id: 3,
    userName: "Anh",
    userAvatar: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    title: "Bún chả Hà Nội ngon tuyệt",
    images: {
      id: 3,
      img1: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
      img2: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    },
    like: ["Thảo", "Minh"],
    comment: [
      { text: "Nhìn tuyệt quá!", user: "Thảo" },
      { text: "Rất ngon!", user: "Minh" },
    ],
    createdAt: "2024-08-03T09:15:00Z",
  },
  {
    id: 4,
    userName: "Thảo",
    userAvatar: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    title: "Ăn phở cuốn",
    images: {
      id: 4,
      img1: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
      img2: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    },
    like: ["Huỳnh", "Linh"],
    comment: [
      { text: "Rất ngon!", user: "Huỳnh" },
      { text: "Mình cũng thích món này", user: "Linh" },
    ],
    createdAt: "2024-08-04T14:45:00Z",
  },
  {
    id: 5,
    userName: "Linh",
    userAvatar: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    title: "Thưởng thức bánh mì Sài Gòn",
    images: {
      id: 5,
      img1: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
      img2: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    },
    like: ["Minh", "Thảo", "Anh"],
    comment: [
      { text: "Bánh mì ngon quá!", user: "Minh" },
      { text: "Mình muốn ăn thử", user: "Thảo" },
      { text: "Ngon lắm!", user: "Anh" },
    ],
    createdAt: "2024-08-05T11:00:00Z",
  },
  {
    id: 6,
    userName: "Nam",
    userAvatar: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    title: "Món ngon bánh cuốn",
    images: {
      id: 6,
      img1: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
      img2: "/assets/images/cdb56840615cff74167efa4c463f3b05.jpg",
    },
    like: ["Minh", "Thảo", "Huỳnh"],
    comment: [
      { text: "Rất ngon!", user: "Minh" },
      { text: "Món yêu thích của mình", user: "Thảo" },
      { text: "Món này ngon!", user: "Huỳnh" },
    ],
    createdAt: "2024-08-06T08:20:00Z",
  },
];

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user") || "{}"; // Giả sử bạn lưu thông tin người dùng dưới dạng JSON trong localStorage
    console.log("user", user);
    if (user) {
      setCurrentUser(JSON.parse(user)); // Chuyển đổi từ chuỗi JSON về đối tượng
    }
  }, []);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  return (
    <div className="background-light800_dark400 mt-7 flex w-full pt-20">
      <div className="background-light800_dark400 hidden w-2/5 pl-[2%] lg:block">
        <h1 className="text-dark100_light500 text-2xl">Hello Huỳnh,</h1>
        <h2 className="text-primary-100">How are you today?</h2>
        <div className=" mt-3 flex items-center">
          <Image
            src="/assets/images/62ceabe8a02e045a0793ec431098bcc1.jpg"
            alt="Avatar"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <p className="text-dark100_light500 ml-3 text-xl">Huỳnh</p>
        </div>
      </div>
      <div className="background-light800_dark400 w-[700px] justify-center px-3">
        <div
          className="background-light700_dark300 h-[135px] w-full rounded-lg px-2"
          onClick={toggleForm}
        >
          <div className="mx-[1%] pl-4 pt-6">
            <div className="flex">
              <div className="size-[40px] overflow-hidden rounded-full">
                <Image
                  src="/assets/images/62ceabe8a02e045a0793ec431098bcc1.jpg"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <input
                type="text"
                placeholder="    Share something..."
                className="background-light600_dark200 ml-3 h-[40px] w-full rounded-full text-base"
                readOnly // Đặt thành chỉ đọc để không thể nhập vào
              />
            </div>
          </div>

          <div className="ml-7 mt-3 flex justify-center">
            <div className="flex">
              <Icon
                className="text-lg text-primary-100"
                icon="gravity-ui:picture"
              />
              <label className="ml-1 text-sm text-primary-100">Image</label>
            </div>
            <div className="ml-[10%] flex">
              <Icon
                className="text-lg text-primary-100"
                icon="lets-icons:video-light"
              />
              <label className="ml-1 text-sm text-primary-100">Video</label>
            </div>
            <div className="ml-[10%] flex font-light">
              <Icon
                className="text-lg text-primary-100"
                icon="icon-park-outline:emotion-happy"
              />
              <label className="ml-1 text-sm font-light text-primary-100">
                Emotion
              </label>
            </div>
          </div>

          {/* Hiển thị Form Create Post nếu isFormOpen là true */}
        </div>
        <div className="my-2 flex items-center">
          <hr className="background-light800_dark300 h-px w-full border-0" />
          <div className="flex shrink-0 items-center pl-4">
            <p className="text-dark100_light500 mr-2">Filter: </p>
            <Filter
              filters={HomePageFilters}
              otherClasses="min-h-[40px] sm:min-w-[140px]"
              containerClasses=" max-md:flex"
            />
          </div>
        </div>
        <div className="background-light800_dark400  flex w-full flex-col gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostsCard
                key={post.id}
                _id={post.id}
                author={post.userName}
                avatar={post.userAvatar}
                title={post.title}
                images={post.images}
                like={post.like}
                comment={post.comment}
                createdAt={post.createdAt}
              />
            ))
          ) : (
            <NoResult
              title="no result"
              description="No articles found"
              link="/"
              linkTitle="Tro lai"
            />
          )}
        </div>
      </div>
      <div className="background-light800_dark400 ml-3 hidden w-2/5 items-center justify-center px-10 md:block">
        <div className="background-light700_dark300 mr-[3%] h-auto w-full rounded-lg border border-none p-3">
          <p className="text-dark100_light500 text-lg"># HashTag</p>
        </div>
      </div>
      {isFormOpen && (
        <CreatePost
          // currentUser={currentUser}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
