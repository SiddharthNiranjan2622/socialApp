import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from '../api';

const chatSlice = createSlice({
  name: 'Chat',
  initialState: {
    conversation: null,
    conversationLoading: false,
    message: [],
    createMessageLoading: false,
    requesteMessageLoading: false,
    allConversations: [],
    allConversationsLoading: false,
  },
  reducers: {
    conversationRequested: (state, action) => {
      state.conversationLoading = true;
    },
    conversationCreated: (state, action) => {
      state.conversation = action.payload;
      state.conversationLoading = false;
    },
    createMessageRequested: (state, action) => {
      state.createMessageLoading = false;
    },
    messageCreated: (state, action) => {
      // state.message(...this.message,action.payload)
      state.message = action.payload
      state.createMessageLoading = false;
    },
    messageRequested: (state, aciton) => {
      state.requesteMessageLoading = true;
    },
    messageRecieved: (state, action) => {
      state.message = action.payload;
      state.requesteMessageLoading = false;
    },
    allConversationsRequested: (state, action) => {
      state.allConversationsLoading = true;
    },
    allConversationsRecieved: (state, action) => {
      state.allConversations = action.payload;
      state.allConversationsLoading = false;
    },
  },
});

const {
  conversationCreated,
  conversationRequested,
  createMessageRequested,
  messageCreated,
  messageRecieved,
  messageRequested,
  allConversationsRecieved,
  allConversationsRequested,
} = chatSlice.actions;

export const selectConversation = state => state.chatSlice.conversation;

export const createConversation = (token, receiverId) =>
  apiCallBegan({
    url: `/conversations/createConversations/${receiverId}`,
    method: 'post',
    onStart: conversationRequested.type,
    onSuccess: conversationCreated.type,
    headers: {
      authorization: token,
    },
  });

export const selectMessages = state => state.chatSlice.message;

export const getMessages = (token, conversationId) =>
  apiCallBegan({
    url: `/messages/getMessages/${conversationId}`,
    method: 'get',
    onstart: messageRequested.type,
    onSuccess: messageRecieved.type,
    headers: {
      authorization: token,
    },
  });

export const selectAllConversations = state => state.chatSlice.allConversations;

export const getConversations = token =>
  apiCallBegan({
    url: '/conversations/getConversations',
    headers: {
      authorization: token,
    },
    onStart: allConversationsRequested.type,
    onSuccess: allConversationsRecieved.type,
    method: 'get',
  });

export const createMessage = (token, data) =>
  apiCallBegan({
    url: '/messages/createMessage',
    method: 'post',
    headers: {
      authorization: token,
    },
    onStart: createMessageRequested.type,
    onSuccess: messageCreated.type,
    data: data,
  });
export default chatSlice.reducer;
