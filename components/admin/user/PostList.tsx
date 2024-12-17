"use client";
import TableSearch from "@/components/shared/TableSearch";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Table from "@/components/shared/Table";

type ActivityType = "post";

const columns = [
  {
    header: "Posted User",
    accessor: "postedUser",
    className: " text-lg font-md",
  },
  {
    header: "ID",
    accessor: "id",
    className: "hidden md:table-cell text-lg font-md",
  },
  {
    header: "Created Date",
    accessor: "createdDate",
    className: " text-lg font-md",
  },
  {
    header: "Content",
    accessor: "content",
    className: "hidden lg:table-cell text-lg font-md",
  },
  // {
  //   header: "Like At",
  //   accessor: "createdDate",
  //   className: "hidden lg:table-cell text-lg font-md",
  // },

  { header: "Type", accessor: "type", className: " text-lg font-md" },
];

const PostList = ({ myPosts }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  // const [activeTab, setActiveTab] = useState<ActivityType>("post");
  const [isMounted, setIsMounted] = useState(false);

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({
    key: "createdAt",
    direction: "ascending",
  });

  const getValueByKey = (item: any, key: string) => {
    switch (key) {
      case "postedUser":
        return `${item.author.firstName} ${item.author.lastName}`;
      case "id":
        return item._id;
      case "createdDate":
        return item.createdAt;
      case "content":
        return item.content;
      case "type":
        return item.type;
      default:
        return "";
    }
  };

  const sorted = [...myPosts].sort((a, b) => {
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

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filterData = sorted.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    // Filter by searchQuery
    const matchesSearch =
      item.author.firstName.toLowerCase().includes(lowerCaseQuery) ||
      item.author.lastName.toLowerCase().includes(lowerCaseQuery) ||
      item.content.toLowerCase().includes(lowerCaseQuery) ||
      format(item.createdAt, "dd/MM/yyyy")
        .toLowerCase()
        .includes(lowerCaseQuery);

    // Filter by filterOption (you can expand this logic if needed)
    const matchesFilter =
      (filterOption === "offline" && item.status === 0) ||
      (filterOption === "online" && item.status === 1) ||
      !filterOption;

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderRow = (item: any) => (
    <tr key={item._id} className=" my-4 border-t border-gray-300  text-sm ">
      <td className="px-4 py-2">
        <Link href={`/user/${item.author._id}`}>
          <h3>
            {item.author.firstName} {item.author.lastName}
          </h3>
          <span className="text-xs text-gray-500">#{item.author._id}</span>
        </Link>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <span className="text-sm ">{item._id}</span>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <span className="text-sm ">
          <div className="flex w-full flex-col ">
            <span>{format(item.createAt, "PPP")}</span>
            <span className="pt-1 text-xs text-gray-500">
              {new Date(item.createAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        </span>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <span className="text-sm ">{item.content}</span>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell">
        <button
          className={`${
            item.media.length > 0
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-800"
          } rounded-xl px-4 py-2 text-sm`}
        >
          {item.media.length > 0 ? "Media" : "Status"}
        </button>
      </td>
    </tr>
  );

  return (
    <div className="flex w-full flex-col py-6">
      <TableSearch onSearch={setSearchQuery} />
      {/* <div className="flex w-full flex-col gap-10 py-4 text-sm font-bold dark:text-white lg:flex-row">
        <button
          className={`flex items-center gap-1 ${activeTab === "post" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("post")}
        >
          Post
        </button>
        <button
          className={`flex items-center gap-1 ${activeTab === "image" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("image")}
        >
          Image
        </button>
        <button
          className={`flex items-center gap-1 ${activeTab === "video" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("video")}
        >
          Video
        </button>
      </div> */}

      <div className="w-full px-4">
        <Table
          columns={columns}
          renderRow={renderRow}
          data={filterData} // Pass sorted data to the table
          onSort={(key: string) => requestSort(key)} // Sorting function
        />
      </div>
    </div>
  );
};

export default PostList;
