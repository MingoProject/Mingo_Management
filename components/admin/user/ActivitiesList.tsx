"use client";
import TableSearch from "@/components/shared/TableSearch";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Table from "@/components/shared/Table";

type ActivityType = "save" | "like";

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
  { header: "Type", accessor: "type", className: " text-lg font-md" },
];

const ActivitiesList = ({ savedPosts, likedPosts }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [activeTab, setActiveTab] = useState<ActivityType>("save");
  const [isMounted, setIsMounted] = useState(false);

  const getFilteredData = () => {
    switch (activeTab) {
      case "save":
        return savedPosts;
      case "like":
        return likedPosts;
      // case "reported":
      //   return likedPosts; // Sử dụng dữ liệu "likedPosts" cho "reported"
      default:
        return savedPosts;
    }
  };

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({
    key: "createdDate",
    direction: "ascending",
  });

  const filterData = getFilteredData().filter((item: any) => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    // Lọc theo searchQuery
    const matchesSearch =
      item.author.firstName.toLowerCase().includes(lowerCaseQuery) ||
      item.author.lastName.toLowerCase().includes(lowerCaseQuery) ||
      item.content.toLowerCase().includes(lowerCaseQuery) ||
      item._id.toLowerCase().includes(lowerCaseQuery) ||
      format(item.createAt, "dd/MM/yyyy")
        .toLowerCase()
        .includes(lowerCaseQuery);

    // Lọc theo giá trị bộ lọc được chọn
    const matchesFilter =
      (filterOption === "offline" && item.status === 0) ||
      (filterOption === "online" && item.status === 1) ||
      !filterOption; // Không có bộ lọc nào được chọn thì hiển thị tất cả

    return matchesSearch && matchesFilter;
  });

  const sorted = [...filterData].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderRow = (item: any) => (
    <tr key={item._id} className=" my-4 border-t border-gray-300  text-sm ">
      <td className="px-4 py-2">
        <Link href={`/post/${item.author._id}`}>
          <h3>
            {item.author.firstName} {item.author.lastName}
          </h3>
          <span className="text-xs text-gray-500">#{item._id}</span>
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
      <div className="flex w-full flex-col gap-10 py-4 text-sm font-bold dark:text-white lg:flex-row">
        <button
          className={`flex items-center gap-1 ${activeTab === "save" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("save")}
        >
          Saved
        </button>
        <button
          className={`flex items-center gap-1 ${activeTab === "like" ? "text-primary-100 opacity-100" : "opacity-40"}`}
          onClick={() => setActiveTab("like")}
        >
          Liked
        </button>
      </div>

      <div className="w-full px-4">
        <Table
          columns={columns}
          renderRow={renderRow}
          data={sorted} // Pass sorted data to the table
          onSort={(key: string) => requestSort(key)} // Sorting function
        />
      </div>
    </div>
  );
};

export default ActivitiesList;
