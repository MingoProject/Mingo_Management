"use client"; // Đảm bảo dòng này là dòng đầu tiên

import ActivitiesList from "@/components/admin/user/ActivitiesList";
import FriendList from "@/components/admin/user/FriendList";
import GeneralInformation from "@/components/admin/user/GeneralInformation";
import ImageList from "@/components/admin/user/ImageList";
import OtherInformation from "@/components/admin/user/OtherInformation";
import PostList from "@/components/admin/user/PostList";
import VideoList from "@/components/admin/user/VideoList";
import HeaderWithButton from "@/components/header/HeaderWithButton";
import TilteIcon from "@/components/header/TilteIcon";
import fetchDetailedPosts from "@/hooks/usePosts";
import {
  getMyBffs,
  getMyBlocks,
  getMyFollowings,
  getMyFriends,
  getMyImages,
  getMyLikedPosts,
  getMyPosts,
  getMyProfile,
  getMySavedPosts,
  getMyVideos,
} from "@/lib/services/user.service";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

interface Params {
  id: string;
}
const Page = ({ params }: { params: Params }) => {
  const { id } = params;
  const [profileUser, setProfileUser] = useState();

  const [friendsData, setFriendsData] = useState<any[]>([]);
  const [bestfriendsData, setBestfriendsData] = useState<any[]>([]);
  const [followingsData, setFollowingsData] = useState<any[]>([]);
  const [blocksData, setBlocksData] = useState<any[]>([]);
  const [followersData, setFollowersData] = useState<any[]>([]);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [myImages, setMyImages] = useState<any[]>([]);
  const [myVideos, setMyVideos] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      const data = await getMyFriends(id);
      const formattedData = data.map((user: any) => ({
        id: user._id,
        fullname: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phoneNumber,
        status: user.status,
        enrolled: new Date(user.createAt),
        birthday: new Date(user.birthDay),
      }));
      if (isMounted) {
        setFriendsData(formattedData);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [id]);
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      const data = await getMyBffs(id);
      const formattedData = data.map((user: any) => ({
        id: user._id,
        fullname: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phoneNumber,
        status: user.status,
        enrolled: new Date(user.createAt),
        birthday: new Date(user.birthDay),
      }));
      if (isMounted) {
        setBestfriendsData(formattedData);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [id]);
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      const data = await getMyFollowings(id);
      const formattedData = data.map((user: any) => ({
        id: user._id,
        fullname: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phoneNumber,
        status: user.status,
        enrolled: new Date(user.createAt),
        birthday: new Date(user.birthDay),
      }));
      if (isMounted) {
        setFollowingsData(formattedData);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [id]);
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      const data = await getMyBlocks(id);
      const formattedData = data.map((user: any) => ({
        id: user._id,
        fullname: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phoneNumber,
        status: user.status,
        enrolled: new Date(user.createAt),
        birthday: new Date(user.birthDay),
      }));
      if (isMounted) {
        setBlocksData(formattedData);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [id]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMyProfile(id);
        // console.log("data", data);

        if (!data || !data.userProfile) {
          console.error("User profile not found!");
          return;
        }
        setProfileUser(data.userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchUser();
  }, [id]);
  useEffect(() => {
    let isMounted = true;
    const fetchPostsData = async () => {
      try {
        const savedData = await getMySavedPosts(id);
        const likedData = await getMyLikedPosts(id);

        const savedPosts = await fetchDetailedPosts(savedData);
        const likedPosts = await fetchDetailedPosts(likedData);

        if (isMounted) {
          setSavedPosts(savedPosts);
          setLikedPosts(likedPosts);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchPostsData();

    return () => {
      isMounted = false;
    };
  }, [id]);
  useEffect(() => {
    let isMounted = true;
    const fetchMyPosts = async () => {
      try {
        const data = await getMyPosts(id);

        const myPosts = await fetchDetailedPosts(data.userPosts);
        if (isMounted) {
          setMyPosts(myPosts);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchMyPosts();

    return () => {
      isMounted = false;
    };
  }, [id]);
  useEffect(() => {
    let isMounted = true;
    const fetMyImages = async () => {
      try {
        const data = await getMyImages(id);
        if (isMounted) {
          setMyImages(data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetMyImages();

    return () => {
      isMounted = false;
    };
  }, [id]);
  useEffect(() => {
    let isMounted = true;
    const fetchMyVideos = async () => {
      try {
        const data = await getMyVideos(id);
        if (isMounted) {
          setMyVideos(data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchMyVideos();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="text-dark100_light500 background-light700_dark400 flex size-full flex-col p-4">
      <HeaderWithButton title="User Detail" type={1} />
      <div className="w-full rounded-[10px] p-4 shadow-sm">
        <TilteIcon title="General Information" icon={faAddressCard} />
        <GeneralInformation item={profileUser} />
        <TilteIcon title="Other Information" icon={faAddressCard} />
        <OtherInformation item={profileUser} />
        <TilteIcon title="Friends" />
        <FriendList
          friendsData={friendsData}
          bestfriendsData={bestfriendsData}
          blocksData={blocksData}
          followingsData={followingsData}
        />
        <TilteIcon title="Activities" />
        <ActivitiesList savedPosts={savedPosts} likedPosts={likedPosts} />
        <TilteIcon title="Posts" />
        <PostList myPosts={myPosts} />
        <TilteIcon title="Images" />
        <ImageList imagesData={myImages} profileUser={profileUser} />
        <TilteIcon title="Videos" />
        <VideoList videosData={myVideos} profileUser={profileUser} />
      </div>
    </div>
  );
};

export default Page;
