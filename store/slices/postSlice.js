import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {apiCallBegan} from '../api';
import {selectUser} from './userSlice';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    uploadLoading: false,
    uploadProgress: 0,
    userPosts: [],
    userPostLoading: false,
    otherUserPost: [],
  },
  reducers: {
    postRequested: (state, action) => {
      state.loading = true;
    },
    postAddRequest: (state, action) => {
      state.loading = true;
    },
    postAdded: (state, action) => {
      state.uploadLoading = false;
      state.posts.push(action.payload);
    },
    postRecieved: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    postRequestFailed: (state, action) => {
      state.loading = false;
    },
    postUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    postUploaded: state => {
      state.loading = false;
    },
    userPostRecieved: (state, action) => {
      state.loading = false;
      state.userPostLoading = false;
      state.userPosts = action.payload;
    },
    userPostRequested: (state, action) => {
      state.userPostLoading = true;
    },
    otherUserPostRecieved: (state, action) => {
      state.otherUserPost = action.payload;
      state.userPostLoading = false;
    },
  },
});
export default postSlice.reducer;

// console.log(userSelector)
export const selectPosts = state => state.postSlice.posts;

export const {
  postAdded,
  postRecieved,
  postRequested,
  postRequestFailed,
  postAddRequest,
  postUploadProgress,
  postUploaded,
  userPostRecieved,
  userPostRequested,
  otherUserPostRecieved,
} = postSlice.actions;

const addPostUrl = 'posts/createPost';

export const addPost = (post, token) =>
  apiCallBegan({
    url: addPostUrl,
    method: 'post',
    data: post,
    onStart: postAddRequest.type,
    onSuccess: postUploaded.type,
    uploadProgress: postUploadProgress.type,
    onStart: postAddRequest.type,
    headers: {
      Accept: 'application/json',
      'Content-type': 'multipart/form-data',
      authorization: token,
    },
  });
const getPostUrl = 'posts/getAllPosts';

export const selectPost = state => state.postSlice.posts;

export const getPost = token =>
  apiCallBegan({
    url: getPostUrl,
    method: 'get',
    onSuccess: postRecieved.type,
    headers: {
      Authorization: token,
    },
    onStart: postRequested.type,
    onError: postRequestFailed.type,
    // postToRedux: true,
  });

const getUserPostUrl = 'posts/getPost';

export const selectUserPost = state => state.postSlice.userPosts;

export const getUserPost = token =>
  apiCallBegan({
    url: getUserPostUrl,
    method: 'get',
    headers: {
      Authorization: token,
    },
    onStart: userPostRequested.type,
    onSuccess: userPostRecieved.type,
  });

