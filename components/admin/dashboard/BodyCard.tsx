import TotalCard from "@/components/cards/TotalCard";
import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import {
  countReports,
  countReportsByCreatedDate,
} from "@/lib/services/report.service";
import {
  countUsers,
  countUsersByAttendDate,
} from "@/lib/services/user.service";
import {
  countPosts,
  countPostsByAttendDate,
} from "@/lib/services/post.service";
import { getNotifications } from "@/lib/services/notification.service";

const BodyCard = () => {
  const [users, setUsers] = useState<number>(0);
  const [posts, setPosts] = useState<number>(0);
  const [reports, setReports] = useState<number>(0);
  const [usersByAttendDate, setUsersByAttendDate] = useState<number>(0);
  const [postsByCreatedDate, setPostsByCreatedDate] = useState<number>(0);
  const [reportsByCreatedDate, setReportsByCreatedDate] = useState<number>(0);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const count = async () => {
      const users = await countUsers();
      const posts = await countPosts();
      const reports = await countReports();
      const newUsers = await countUsersByAttendDate();
      const newPosts = await countPostsByAttendDate();
      const newReports = await countReportsByCreatedDate();
      if (isMounted) {
        setUsers(users);
        setPosts(posts);
        setReports(reports);
        setUsersByAttendDate(newUsers);
        setPostsByCreatedDate(newPosts);
        setReportsByCreatedDate(newReports);
      }
    };
    count();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchNotification = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await getNotifications(token);
          console.log("res", res);
          if (isMounted) {
            setNotifications(res);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotification();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex w-full items-end ">
      <div className="flex w-8/12 justify-start gap-16 ">
        <TotalCard
          route="user"
          title="Users"
          amount={users}
          plus={usersByAttendDate}
        />
        <TotalCard
          route="post"
          title="Posts"
          amount={posts}
          plus={postsByCreatedDate}
        />
        <TotalCard
          route="report"
          title="Reports"
          amount={reports}
          plus={reportsByCreatedDate}
        />
      </div>
      <div className="mr-16 w-4/12  rounded-[10px] border p-4 shadow-md">
        <Notification notifications={notifications} />
      </div>
    </div>
  );
};

export default BodyCard;
