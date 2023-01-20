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

export type AuthModalType =
  | 'signup'
  | 'login'
  | 'signup-form'
  | 'login-form'
  | '';

interface IUserID {
  userId: string;
}

export interface Tweet {
  id: string;
  userId: string;
  fullName: string;
  twitterHandle: string;
  profilePicture: string;
  caption: string;
  media: StaticImageData[]; // TODO: change to string for URI
  creationDate: string;
  likes: IUserID[];
  retweets: IUserID[];
}

export interface Reply extends Tweet {
  inner_replies: Reply[];
}

export interface IWhatsHappening {
  id: string;
  title: string;
  context?: string;
  isTrending?: boolean;
  time?: string; // TODO: to be changed later
  numberOfTweets?: number;
  image?: StaticImageData;
}

export interface IWhoToFollow {
  id: string;
  fullName: string;
  handle: string;
  profilePicture: string;
  isPromoted: boolean;
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
