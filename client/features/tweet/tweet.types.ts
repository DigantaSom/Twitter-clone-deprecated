import { Tweet } from '../../types';

export type TweetResponse = {
  ids: string[];
  entities: Record<string, Tweet>;
};
