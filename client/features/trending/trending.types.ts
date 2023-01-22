import { StaticImageData } from 'next/image';

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

export interface TrendingState {
  whatsHappening: IWhatsHappening[];
  whoToFollow: IWhoToFollow[];
}
