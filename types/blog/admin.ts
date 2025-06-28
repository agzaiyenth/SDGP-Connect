import { BlogPost, BlogAuthor } from '../blog';

export interface AdminBlogPost extends BlogPost {
  author: BlogAuthor;  approvedBy?: {
    user_id: string;
    name: string;
  } | null;
  rejectedBy?: {
    user_id: string;
    name: string;
  } | null;
}

export interface PendingBlogPost extends AdminBlogPost {
  approved: false;
  approvedById: null;
  rejectedById: null;
}

export interface ApprovedBlogPost extends AdminBlogPost {
  approved: true;
  approvedById: string;
  approvedBy: {
    user_id: string;
    name: string;
  };
}

export interface RejectedBlogPost extends AdminBlogPost {
  approved: false;
  rejectedById: string;
  rejectedBy: {
    user_id: string;
    name: string;
  };
  rejectedReason: string;
}

export interface BlogStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  featured: number;
}

export interface BlogListResponse {
  blogs: AdminBlogPost[];
  total: number;
  page: number;
  totalPages: number;
}

export type BlogStatus = 'pending' | 'approved' | 'rejected';
