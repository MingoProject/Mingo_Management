"use client"; // Đảm bảo dòng này là dòng đầu tiên

import ActivitiesList from "@/components/admin/user/ActivitiesList";
import FriendList from "@/components/admin/user/FriendList";
import GeneralInformation from "@/components/admin/user/GeneralInformation";
import OtherInformation from "@/components/admin/user/OtherInformation";
import PostList from "@/components/admin/user/PostList";
import HeaderWithButton from "@/components/header/HeaderWithButton";
import TilteIcon from "@/components/header/TilteIcon";
import {
  getMyBffs,
  getMyBlocks,
  getMyFollowings,
  getMyFriends,
  getMyProfile,
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

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      const data = await getMyFriends(id);
      const formattedData = data.map((user: any) => ({
        id: user._id,
        fullname: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phoneNumber,
        status: user.status ? "Active" : "Inactive",
        enrolled: new Date(user.createAt),
        birthday: new Date(user.birthDay),
      }));
      console.log(formattedData);
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
      const data = await getMyFriends(id);
      const formattedData = data.map((user: any) => ({
        id: user._id,
        fullname: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phoneNumber,
        status: user.status ? "Active" : "Inactive",
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
        status: user.status ? "Active" : "Inactive",
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
        status: user.status ? "Active" : "Inactive",
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
        status: user.status ? "Active" : "Inactive",
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
        console.log("data", data);

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
    console.log("profileUser", profileUser);
    console.log("friends", friendsData);
  }, [profileUser]);

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
        {/* <ActivitiesList /> */}
        <TilteIcon title="Post" />
        {/* <PostList /> */}
      </div>
    </div>
  );
};

export default Page; // Đảm bảo tên thành phần viết hoa
