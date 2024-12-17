"use client";
import React, { useEffect, useState } from "react";
import Table from "./Table";
import Link from "next/link";
import { format } from "date-fns";
import Done from "@/components/cards/Done";
import InProgress from "@/components/cards/InProgress";
import Chart from "./Chart";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchReport } from "@/lib/services/report.service";
import Rejected from "@/components/cards/Rejected";

type Report = {
  id: string;
  createdUser: any;
  reportedUser: any;
  createDate: Date;
  type: string;
  status: number;
};

const columns = [
  { header: "Created User", accessor: "createdUser" },
  {
    header: "Reported User",
    accessor: "reportedUser",
    className: "hidden md:table-cell",
  },
  {
    header: "Created Date",
    accessor: "createDate",
    className: "hidden lg:table-cell",
  },
  { header: "type", accessor: "type" },
  { header: "Status", accessor: "status" },
];

const BodyTable = () => {
  const [reportsData, setReportsData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      const data = await fetchReport();
      const formattedData = data.slice(0, 10).map((report: any) => ({
        id: report._id,
        createdUser: report.createdById,
        reportedUser: report.reportedId,
        createDate: new Date(report.createdAt),
        type: report.entityType,
        status: report.status,
      }));
      console.log(formattedData);

      if (isMounted) {
        setReportsData(formattedData);
        // console.log(data);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const renderRow = (item: Report) => (
    <tr
      key={item.id}
      className="text-dark100_light500 my-4 border-t border-gray-300 text-xs  md:text-sm "
    >
      <td className="break-words p-2 md:px-4">
        <Link href={`/report/${item.id}`}>
          <h3>
            {item?.createdUser &&
              `${item.createdUser.firstName} ${item.createdUser.lastName}`}
          </h3>
          <p className=" text-gray-500">
            #{item?.createdUser && `${item.createdUser.id}`}
          </p>
        </Link>
      </td>
      <td className="hidden px-4 py-2 md:table-cell">
        <h3>
          {item?.reportedUser &&
            `${item.reportedUser.firstName} ${item.reportedUser.lastName}`}
        </h3>
        <p className=" text-gray-500">
          #{item?.reportedUser && `${item.reportedUser.id}`}
        </p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        {format(item.createDate, "dd/MM/yyyy")}
      </td>
      <td className="px-4 py-2 ">
        {(() => {
          switch (item.type) {
            case "comment":
              return (
                <div className="flex w-24 items-center justify-center rounded-lg bg-yellow-200 py-[6px]">
                  <span className="  text-yellow-800">Comment</span>
                </div>
              );
            case "user":
              return (
                <div className="flex w-24 items-center justify-center rounded-lg bg-green-200 py-[6px]">
                  <span className="text-green-800">User</span>
                </div>
              );
            case "post":
              return (
                <div className="flex w-24 items-center justify-center rounded-lg bg-pink-200 py-[6px]">
                  <span className="text-pink-800">Post</span>
                </div>
              );
            case "message":
              return (
                <div className="flex w-24 items-center justify-center rounded-lg bg-purple-200 py-[6px]">
                  <span className="text-purple-800">Message</span>
                </div>
              );
            default:
              return (
                <div className="flex w-24 items-center justify-center rounded-lg bg-gray-400 py-[6px]">
                  <span className="text-gray-800">Unknown</span>
                </div>
              );
          }
        })()}
      </td>
      <td className="px-4 py-2">
        {item.status === 0 ? (
          <InProgress />
        ) : item.status === 1 ? (
          <Done />
        ) : item.status === 2 ? (
          <Rejected />
        ) : (
          "Unknown"
        )}
      </td>
    </tr>
  );

  type SortableKeys =
    | "id"
    | "createdUser"
    | "reportedUser"
    | "createDate"
    | "status";

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending",
  });

  const getValueByKey = (item: (typeof reportsData)[0], key: SortableKeys) => {
    switch (key) {
      case "createdUser":
        return item.createdUser;
      case "reportedUser":
        return item.reportedUser;
      case "createDate":
        return item.createDate;
      case "status":
        return item.status;
      default:
        return "";
    }
  };

  const sorted = [...reportsData].sort((a, b) => {
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

  const requestSort = (key: SortableKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="text-dark100_light500 mr-10 mt-4 flex h-80  w-full rounded-[10px] border p-4 shadow-md">
      <div className="w-2/3">
        <p className="flex items-center gap-4 border-b border-gray-300 pb-1">
          <FontAwesomeIcon
            icon={faBell}
            className="text-dark100_light500 mb-2"
          />
          <span className="text-dark100_light500 text-[20px]">
            Recent reports
          </span>
        </p>
        <div className="no-scrollbar size-full h-60 overflow-auto">
          <Table
            columns={columns}
            renderRow={renderRow}
            data={sorted} // Pass sorted data to the table
            onSort={(key: string) => requestSort(key as SortableKeys)} // Sorting function
          />
        </div>
      </div>

      <div className=" w-1/3 p-4 py-0">
        <Chart reports={reportsData} />
      </div>
    </div>
  );
};

export default BodyTable;
