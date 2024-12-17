// dtos/reportDTO.ts
import { Schema } from "mongoose";

export interface UserInfor {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  dob: Date;
  phoneNumber: string;
  email: string;
  gender: boolean;
}

export interface ReportCreateDTO {
  title?: string; // Tiêu đề báo cáo (tuỳ chọn)
  content: string; // Nội dung báo cáo
  reportedId: Schema.Types.ObjectId; // ID của người bị báo cáo
  reportedEntityId: Schema.Types.ObjectId; // ID của thực thể bị báo cáo (Post ID, User ID, etc.)
  entityType: string; // Loại thực thể (e.g., "post", "user", etc.)
  attachments?: string[]; // Các file đính kèm (tuỳ chọn)
  proofs?: string[]; // Các bằng chứng (tuỳ chọn)
}

export interface ReportResponseDTO {
  _id: string;
  title?: string;
  content: string;
  createdById: UserInfor;
  reportedId: UserInfor;
  reportedEntityId: string;
  entityType: string;
  status: number;
  createdAt: Date;
  attachments?: string[]; // Các file đính kèm (nếu có)
  proofs?: string[]; // Các bằng chứng (nếu có)
}
