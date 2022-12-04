import { createSlice } from '@reduxjs/toolkit';

import { IWhatsHappening, IWhoToFollow } from '../../types';
import constants from '../../constants';
import FifaImg from '../../images/demo-1-whats-happening.jpeg';

interface TrendingState {
  whatsHappening: IWhatsHappening[];
  whoToFollow: IWhoToFollow[];
}

const initialState: TrendingState = {
  whatsHappening: [],
  whoToFollow: [],
};

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    showWhatsHappening: state => {
      state.whatsHappening = [
        {
          id: '1',
          title: 'Canada vs Morocco',
          context: 'FIFA World Cup',
          time: '1 hour ago',
          image: FifaImg,
        },
        {
          id: '2',
          title: '#JensenAckles',
          context: 'Entertainment',
          isTrending: true,
          numberOfTweets: 1521,
        },
        {
          id: '3',
          title: '#SpotifyWrapped2022',
          context: 'Music',
          isTrending: true,
        },
        {
          id: '4',
          title: 'Darkseid',
          context: 'Entertainment',
          isTrending: true,
          numberOfTweets: 355,
        },
      ];
    },
    showWhoToFollow: state => {
      state.whoToFollow = [
        {
          id: '1',
          fullName: 'Visit Oman',
          handle: 'visitoman_vo',
          profilePicture: constants.placeholder_profilePicture,
          isPromoted: true,
        },
        {
          id: '2',
          fullName: 'No Context Brits',
          handle: 'NoContextBrits',
          profilePicture: constants.placeholder_profilePicture,
          isPromoted: false,
        },
        {
          id: '3',
          fullName: 'Bros Helping Bros',
          handle: 'HelpingChads',
          profilePicture: constants.placeholder_profilePicture,
          isPromoted: false,
        },
      ];
    },
  },
});

export const { showWhatsHappening, showWhoToFollow } = trendingSlice.actions;

export default trendingSlice.reducer;
