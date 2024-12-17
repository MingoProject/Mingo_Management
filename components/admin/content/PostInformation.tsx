"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import LableValue from "@/components/header/LableValue";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Table from "@/components/shared/Table";
import { MangementPostResponseDTO } from "@/dtos/PostDTO";
import { getManagementPostById } from "@/lib/services/post.service";

const columns = [
  {
    header: "Author",
    accessor: "author",
    className: "text-lg font-md",
  },
  {
    header: "Comment ID",
    accessor: "commentId",
    className: "hidden md:table-cell text-lg font-md",
  },
  {
    header: "Create Date",
    accessor: "createAt",
    className: "hidden lg:table-cell text-lg font-md",
  },
  {
    header: "Content",
    accessor: "content",
    className: "text-lg font-md",
  },
  {
    header: "Parent Comment",
    accessor: "parentComment",
    className: "text-lg font-md",
  },
];

type SortableKeys =
  | "author"
  | "commentId"
  | "createAt"
  | "content"
  | "parentComment";

const PostInformation = ({ item }: { item: MangementPostResponseDTO }) => {
  const router = useRouter();
  const { id } = useParams();
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "commentId",
    direction: "ascending",
  });
  // const [item, setItem] = useState<MangementPostResponseDTO | null>(null);

  // useEffect(() => {
  //   const fetchReportUser = async () => {
  //     if (!id) return;
  //     try {
  //       const data = await getManagementPostById(id.toString());
  //       setItem(data);
  //       console.log("render 1");
  //     } catch (error) {
  //       console.error("Error fetching post information", error);
  //     }
  //   };

  //   fetchReportUser();
  // }, []);

  const getValueByKey = (
    comment: MangementPostResponseDTO["comment"][0],
    key: SortableKeys
  ) => {
    switch (key) {
      case "author":
        return `${comment.author.firstName} ${comment.author.lastName}`;
      case "commentId":
        return comment.commentId;
      case "createAt":
        return new Date(comment.createAt).getTime();
      case "content":
        return comment.content;
      case "parentComment":
        return comment.parentComment || "N/A";
      default:
        return "";
    }
  };

  const sortedComments =
    item?.comment?.slice().sort((a, b) => {
      const aValue = getValueByKey(a, sortConfig.key);
      const bValue = getValueByKey(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }) || [];

  const requestSort = (key: SortableKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderRow = (comment: any) => {
    return (
      <>
        <tr
          key={comment.commentId}
          className="text-dark100_light500 my-4 border-t border-gray-300 text-sm"
        >
          <td className="px-4 py-2">
            <Link href={`/user/${comment.author.id}`}>
              <h3 className="text-base">{`${comment.author.firstName} ${comment.author.lastName}`}</h3>
              <p className="text-base text-gray-500">#00{comment.author.id}</p>
            </Link>
          </td>
          <td className="hidden px-4 py-2 lg:table-cell">
            <p className="text-base">{comment.commentId}</p>
          </td>
          <td className="hidden px-4 py-2 lg:table-cell">
            <div className="flex w-full flex-col">
              <p>{format(new Date(comment.createAt), "PPP")}</p>
              <p className="pt-1 text-xs text-gray-500">
                {new Date(comment.createAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
          </td>
          <td className="hidden px-4 py-2 lg:table-cell">
            <p className="text-base">{comment.content}</p>
          </td>
          <td className="hidden px-4 py-2 lg:table-cell">
            <p className="text-base">{comment.parentComment || "N/A"}</p>
          </td>
        </tr>
      </>
    );
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex w-full flex-col py-4">
      <div className="flex w-full flex-col px-4 py-2">
        <div className="w-full grid grid-cols-2 gap-x-10">
          <LableValue
            label="Post ID"
            value={item.userId?.id?.toString() || "N/A"}
          />
          <LableValue
            label="Date of Birth"
            value={format(new Date(item.createAt), "PPP")}
          />
          <LableValue label="Content" value={item.content} />
          <LableValue
            label="Location"
            value={item.userId?.id?.toString() || "N/A"}
          />
          <LableValue
            label="Type"
            value={item.attachment?.length > 0 ? "Media" : "Status"}
          />
          <LableValue label="Privacy" value={item.privacy} />
        </div>
      </div>

      <div className="flex w-full flex-col px-4">
        <div className="flex items-center">
          <LableValue label="Like" />
          <div className="flex">
            {item.like.map((like) => (
              <Link key={like.id} href={`/user/${like.id}`}>
                <Image
                  src={like.avatar}
                  height={20}
                  width={20}
                  alt="like user"
                  className="h-auto w-full object-cover rounded-full"
                />
              </Link>
            ))}
          </div>
        </div>

        <LableValue label="Share" />
        <div className="grid grid-cols-5 gap-4">
          {item.share.map((share) => (
            <Image
              key={share.id}
              src={share.avatar}
              height={20}
              width={20}
              alt="share user"
              className="h-auto w-full object-cover rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 px-4">
        <LableValue label="Attachment" />
        <div className="grid grid-cols-5 gap-4">
          {item.attachment
            .slice(0, showAll ? item.attachment.length : 15)
            .map((attachment) => (
              <Image
                key={attachment.id}
                src={attachment.src}
                height={165}
                width={195}
                alt="attachment"
                className="h-auto w-full object-cover"
              />
            ))}
        </div>
        {item.attachment.length > 15 && (
          <button
            className="mt-4 text-blue-500"
            onClick={() => setShowAll(!showAll)}
          >
            <p className="text-primary-100">
              {showAll ? "Ẩn bớt" : "Xem thêm"}
            </p>
          </button>
        )}
      </div>

      <div className="flex w-full flex-col gap-4 px-4">
        <LableValue label="Comment" />
        <Table
          columns={columns}
          renderRow={renderRow}
          data={sortedComments}
          onSort={(key: string) => requestSort(key as SortableKeys)}
        />
      </div>
    </div>
  );
};

export default PostInformation;
