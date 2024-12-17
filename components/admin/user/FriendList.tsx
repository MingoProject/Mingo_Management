"use client";
import TableSearch from "@/components/shared/TableSearch";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
// import { userData } from "@/components/shared/data";
import Active from "@/components/cards/Active";
import Off from "@/components/cards/Off";
import Table from "@/components/shared/Table";

type User = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  status: boolean;
  enrolled: Date;
  birthday: Date;
};

type FriendType = "all" | "bestFriend" | "block" | "following";

const columns = [
  {
    header: "Fullname",
    accessor: "fullname",
    className: " text-lg font-md",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden md:table-cell text-lg font-md",
  },
  {
    header: "Phone Number",
    accessor: "phone",
    className: " text-lg font-md",
  },
  {
    header: "Attend Date",
    accessor: "enrolled",
    className: "hidden lg:table-cell text-lg font-md",
  },
  {
    header: "Birthday",
    accessor: "birthday",
    className: "hidden lg:table-cell text-lg font-md",
  },

  { header: "Status", accessor: "status", className: " text-lg font-md" },
];

const FriendList = ({
  friendsData,
  bestfriendsData,
  blocksData,
  followingsData,
}: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [activeTab, setActiveTab] = useState<FriendType>("all");
  const [isMounted, setIsMounted] = useState(false);

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending",
  });
  type SortableKeys = "id" | "fullname" | "enrolled" | "email" | "phone";

  const getValueByKey = (item: (typeof sorted)[0], key: SortableKeys) => {
    switch (key) {
      case "fullname":
        return item.fullname;
      case "enrolled":
        return item.enrolled;
      case "id":
        return item.id;
      case "email":
        return item.email;
      case "phone":
        return item.phone;
      default:
        return "";
    }
  };

  const getFilteredData = () => {
    switch (activeTab) {
      case "bestFriend":
        return bestfriendsData;
      case "block":
        return blocksData;
      case "following":
        return followingsData;
      default:
        return friendsData;
    }
  };

  const requestSort = (key: SortableKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filterData = getFilteredData().filter((item: any) => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const matchesSearch =
      item.fullname.toLowerCase().includes(lowerCaseQuery) ||
      item.email.toLowerCase().includes(lowerCaseQuery) ||
      item.phone.toLowerCase().includes(lowerCaseQuery) ||
      format(item.enrolled, "dd/MM/yyyy")
        .toLowerCase()
        .includes(lowerCaseQuery);

    const matchesFilter =
      (filterOption === "offline" && !item.status) ||
      (filterOption === "online" && item.status) ||
      !filterOption;

    return matchesSearch && matchesFilter;
  });

  // Kết hợp lọc với sắp xếp
  const sorted = [...filterData].sort((a, b) => {
    const aValue = getValueByKey(a, sortConfig.key);
    const bValue = getValueByKey(b, sortConfig.key);

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderRow = (item: User) => (
    <tr key={item.id} className=" my-4 border-t border-gray-300  text-sm ">
      <td className="px-4 py-2">
        <Link href={`/user/${item.id}`}>
          <h3>{item.fullname}</h3>
          <span className="text-xs text-gray-500">#{item.id}</span>
        </Link>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <span className="text-sm ">{item.email}</span>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <span className="text-sm ">{item.phone}</span>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <span className="text-sm ">
          <div className="flex w-full flex-col ">
            <span>{format(item.enrolled, "PPP")}</span>
            <span className="pt-1 text-xs text-gray-500">
              {new Date(item.enrolled).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        </span>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell">
        <span className="text-sm ">
          <div className="flex w-full flex-col ">
            <span>{format(item.birthday, "PPP")}</span>
            <span className="pt-1 text-xs text-gray-500">
              {new Date(item.birthday).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        </span>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell">
        <span className="text-sm text-gray-500">
          {item.status === false ? <Off /> : <Active />}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="flex w-full flex-col py-6">
      <TableSearch onSearch={setSearchQuery} />
      <div className="flex w-full flex-col gap-10 py-4 text-sm font-bold dark:text-white lg:flex-row">
        <button
          className={`flex items-center gap-1 ${activeTab === "all" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("all")}
        >
          All Friends
        </button>
        <button
          className={`flex items-center gap-1 ${activeTab === "bestFriend" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("bestFriend")}
        >
          Best Friends
        </button>
        <button
          className={`flex items-center gap-1 ${activeTab === "following" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
        <button
          className={`flex items-center gap-1 ${activeTab === "block" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("block")}
        >
          Blocked
        </button>
        {/* <button
          className={`flex items-center gap-1 ${activeTab === "follower" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("follower")}
        >
          Followers
        </button> */}
      </div>

      <div className="w-full px-4">
        <Table
          columns={columns}
          renderRow={renderRow}
          data={sorted} // Pass sorted data to the table
          onSort={(key: string) => requestSort(key as SortableKeys)} // Sorting function
        />
      </div>
    </div>
  );
};

export default FriendList;
