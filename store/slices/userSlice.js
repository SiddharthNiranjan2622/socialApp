import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from '../api';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    loading: false,
    FAndF: [],
    FAndFLoading: false,
    searchedUser: [],
    searchUserLoading: false,
    OtherFAndF: [],
    OtherFAndFLoading: false,
    userFollowLoading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.loading = true;
    },
    FAndFRequested: (state, action) => {
      state.FAndFLoading = true;
    },
    FAndFDataRecieved: (state, action) => {
      state.FAndFLoading = false;
      state.userFollowLoading = false;
      state.FAndF = action.payload;
    },
    userSearchRequested: (state, action) => {
      state.searchUserLoading = true;
    },
    userSearchRecieved: (state, action) => {
      state.searchedUser = action.payload;
      state.searchUserLoading = false;
    },
    OtherFAndFDataRecieved: (state, action) => {
      state.OtherFAndF = action.payload;
      state.OtherFAndFLoading = false;
    },
    OtherFAndFRequested: (state, action) => {
      state.OtherFAndFLoading = true;
    },
    userFollowRequest: (state, action) => {
      state.userFollowLoading = true;
    },
  },
});
export default userSlice.reducer;

export const selectUser = state => state.userSlice.user;

export const selectToken = state => state.userSlice.token;

export const selectFAndFData = sate => sate.userSlice.FAndF;

export const selectSearchedUser = state => state.userSlice.searchedUser;

export const selectOtherFAndFData = state => state.userSlice.OtherFAndF;

export const {
  addUser,
  addToken,
  updateUserProfile,
  FAndFDataRecieved,
  FAndFRequested,
  userSearchRecieved,
  userSearchRequested,
  OtherFAndFDataRecieved,
  OtherFAndFRequested,
  userFollowRequest,
} = userSlice.actions;

const registerUrl = '/user/register-user';

export const registerUser = user =>
  apiCallBegan({
    url: registerUrl,
    method: 'post',
    data: user,
    onSuccess: addToken.type,
  });

const loginUrl = '/user/log-in';

export const loginUser = user =>
  apiCallBegan({
    url: loginUrl,
    method: 'post',
    data: user,
    onSuccess: addToken.type,
  });
const getUserUrl = '/user/getUser';
export const getUserData = token =>
  apiCallBegan({
    url: getUserUrl,
    method: 'get',
    onSuccess: addUser.type,
    headers: {
      authorization: token,
    },
  });

const updateUserUrl = '/user/updateUser';
export const updateUserProfileData = (formData, token) =>
  apiCallBegan({
    onSuccess: addUser.type,
    url: updateUserUrl,
    onStart: updateUserProfile.type,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-type': 'multipart/form-data',
      authorization: token,
    },
    data: formData,
  });

const getUserFAndFDataUrl = '/user/getUserFAndFData';

export const getUserFAndFData = token =>
  apiCallBegan({
    onSuccess: FAndFDataRecieved.type,
    url: getUserFAndFDataUrl,
    onStart: FAndFRequested.type,
    method: 'get',
    headers: {
      authorization: token,
    },
  });
export const searchUser = (token, user) =>
  apiCallBegan({
    url: `/user/getSearchUser/${user}`,
    method: 'get',
    onStart: userSearchRequested.type,
    onSuccess: userSearchRecieved.type,
    headers: {
      authorization: token,
    },
  });

export const getOtherUserFAndFData = (token, userId) =>
  apiCallBegan({
    url: `/user/getOtherUserFAndFData/${userId}`,
    method: 'get',
    onSuccess: OtherFAndFDataRecieved.type,
    onStart: OtherFAndFRequested.type,
    headers: {
      authorization: token,
    },
  });

export const followUser = (token, user) =>
  apiCallBegan({
    url: `/user/addFollowing/${user}`,
    method: 'post',
    onSuccess: OtherFAndFDataRecieved.type,
    onStart: userFollowRequest.type,
    headers: {
      authorization: token,
    },
  });
