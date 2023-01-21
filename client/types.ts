import { StaticImageData } from 'next/image';

export interface IUser {
  id: string;
  name: string;
  email: string;
  handle: string;
  profilePicture: string;
  birthday: string;
  joiningDate: string;
}

interface IUserID {
  userId: string;
}

export interface Tweet {
  _id: string;
  userId: string;
  fullName: string;
  twitterHandle: string;
  profilePicture: string;
  caption: string;
  media: StaticImageData[]; // TODO: change to string for URI
  creationDate: string;
  likes: IUserID[];
  replies: Reply[];
  retweets: IUserID[];
}

export interface Reply extends Tweet {
  inner_replies: Reply[];
}

export type MonthType =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
