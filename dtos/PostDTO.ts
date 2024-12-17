import { Schema } from "mongoose";
import { UserInfor } from "./ReportDTO";

export interface PostCreateDTO {
  content: string;
  media?: string[];
  url?: string;
  location?: string;
  privacy?: {
    type: string;
    allowedUsers?: Schema.Types.ObjectId[];
  };
}

export interface PostResponseDTO {
  _id: string;
  content: string;
  media?: string[];
  url?: string;
  createdAt: Date;
  author: Schema.Types.ObjectId;
  shares: Schema.Types.ObjectId[];
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  location?: string;
  privacy: {
    type: string;
    allowedUsers?: Schema.Types.ObjectId[];
  };
  likedIds: Schema.Types.ObjectId[];
  flag: boolean;
}

export interface MangementPostResponseDTO {
  userId: UserInfor;
  postId: string;
  content: string;
  createAt: Date;
  location: string;
  tag: { id: string; avatar: string }[];
  privacy: string;
  attachment: { id: string; src: string }[];
  like: { id: string; avatar: string }[];
  share: { id: string; avatar: string }[];
  comment: {
    commentId: string;
    author: { id: string; firstName: string; lastName: string };
    createAt: Date;
    content: string;
    parentComment?: string;
  }[];
}
export interface PostYouLikeDTO {
  _id: string;
  user_id: string;
  post_id: string;
  created_at: Date;
  posts: {
    _id: string;
    content: string;
    posterAva: string;
    posterName: string;
    like_at: Date;
  }[];
}
