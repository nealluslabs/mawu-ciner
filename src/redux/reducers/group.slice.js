import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       myGroups: [], 
       allGroups: [], 
       publicGroups: [], 
       privateGroups: [],
       groupMembers: [], 
       employeer: {}, 
       message: '',
       watchlist:[],
       toWatch:[],
       movie:[],      // <---------- where store movieData changes    
      isLoading:false,
      playlistUpdate:false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    saveMyGroup: (state, action) => {
        state.myGroups = action.payload;
    },
    saveAllGroup: (state, action) => {
        state.allGroups = action.payload;
    },
    savePublicGroup: (state, action) => {
        state.publicGroups = action.payload;
    },
    savePrivateGroup: (state, action) => {
        state.privateGroups = action.payload;
    },
    saveGroupMembers: (state, action) => {
      state.groupMembers = action.payload;
  },
    saveEmployeer: (state, action) => {
      state.employeer = action.payload;
  },
  storeMovieData: (state, action) => {
    //state.movie.push(action.payload);  //  <--------------------------- store movie data function itself
     state.movie = action.payload
  },
  storeWatchListData: (state, action) => {
    //state.watchlist && state.watchlist.push(action.payload);  //  <--------------------------- store movie data function itself
    state.watchlist && (state.watchlist = action.payload)
    state.toWatch = action.payload
  },
    isItLoading: (state, action) => {
      state.isLoading = action.payload;
  },
  playlistUpdate: (state, action) => {
    state.playlistUpdate =action.payload;
},
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = groupSlice;

export const {
 saveMyGroup,
 saveAllGroup,
 savePublicGroup,
 savePrivateGroup,
 saveGroupMembers,
 saveEmployeer,
 isItLoading,
 playlistUpdate,
 storeMovieData,
 storeWatchListData,
 clearGroup
} = actions;

export default reducer;


