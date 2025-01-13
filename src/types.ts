import type { GetProp, UploadProps } from "antd";

export interface INotification {
  message: string;
  seen: boolean;
  createDate: string;
  number: string;
  id: number;
  customerId: string;
  seenDate: string | null;
  email?: string;
}

export interface ICompany {
  name: string;
  id: string;
  position: number;
}

export interface IOrder {
  id: number;
  number: string;
  customerId: string;
  registrationTime: string;
  comment: string;
  workNotes:string;
  state: number;
  servedUser?: string | null;
  servedUserCount?: number | null;
  serviceType: string;
  programCode?: string | null;
  phone: string;
  email: string;
}

export interface IPayment {
  id: number;
  number: string;
  transactionReference: string;
  date: string;
  dtAmount: number;
  ktAmount: number;
  // journal: string;
}

export interface IService {
  id: string;
  name: string;
}
export interface IDateRange {
  start: string;
  end: string;
}

export interface ICourse {
  currentTime: ReactNode;
  duration: ReactNode;
  playbackRate: number;
  volume: number;
  muted: boolean;
  loop: boolean;
  videoUrl: ICourse | null;
  id: number;
  title: string;
  author: string;
  intro: string;
  content: string | null;
  thumbnail: string;
  video: string;
  views: number;
}

export interface IParentCourse extends ICourse {
  childs: number;
  category: string;
  likes: number;
  deslikes: number;
  created_at: string;
}

export interface ICourseCategory {
  id: number;
  name: string;
  description: string;
}

export interface ICompanyTags {
  ids: (string | number)[];
  names: string[];
}

export enum UserRole {
  site = "site",
  client = "client",
  employee = "employee",
}

export interface IUser {
  id?: number;
  roles: UserRole[];
  isSite: boolean;
  isClient: boolean;
  isEmployee: boolean;
  isAnonymous: boolean;
  email?: string;
  name?: string;
  token?: string;
  companies?: ICompany[];
  isAccountant: boolean;
}

export enum BackendStatus {
  SUCCESS = 200,
  EBADREQUEST = 400,
  EUNAUTHORIZED = 401,
  EFORBIDDEN = 403,
  ENOTFOUND = 404,
  ESERVERERROR = 500,
  EUNKNOWN = 0,
}

export interface PaginatedMeta {
  current_page: number;
  per_page: number;
  total: number;
}

export interface BackendResponse<T> {
  data?: T;
  success: boolean;
  status: BackendStatus;
  message?: string;
  meta?: PaginatedMeta;
}

export type BackendPromise<T> = Promise<BackendResponse<T>>;

export interface Paginated<T> extends PaginatedMeta {
  data: T[];
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

export type PaginatedResponse<T> = BackendResponse<Paginated<T>>;

export type PaginatedPromise<T> = Promise<PaginatedResponse<T>>;

export type IDataType = IOrder | IPayment;
export interface IArticle {
  id: number;
  title: string;
  thumbnall: string;
  intro: string;
  content?: string;
  category: {
    id: number;
    name: string;
  };
}
export interface ISliderItem {
  image: string;
  id: string;
}

export interface IPaginationData {
  page: number;
  pageSize: number;
  total: number;
}

export enum FeedbackStatus {
  CREATED = "Created",
  INPROCESS = "In process",
  ANSWERED = "Answered",
  ARCHIVED = "Archived",
}

export interface IFeedback {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  category: string;
  categoryId: number;
  status: FeedbackStatus;
  answers: number;
  image: string;
}

export interface IFeedbackCategory {
  id: number;
  name: string;
}

export interface IFeedbackAnswer {
  id: number;
  feedbackId: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  author: string;
}

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export interface IPageToken {
  id: number;
  content: string;
  image: string;
}
