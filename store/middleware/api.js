import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import * as actions from '../api';

const api =
  ({dispatch}) =>
  next =>
  async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const {
      url,
      method,
      data,
      onSuccess,
      onError,
      onStart,
      headers,
      uploadProgress,
      removeUser,
    } = action.payload;

    if (onStart) dispatch({type: onStart});
    next(action);
    console.log(action.payload);
    console.log(data);
    try {
      console.log(data);
      const response = await axios.request({
        baseURL: 'http://192.168.29.189:3000/api/',
        method,
        data,
        url,
        headers,
      });

      console.log('onsuccess', onSuccess);
      dispatch(actions.apiCallSuccess(response.data));

      console.log('from api middleware', response.data);

      // if (!response.data.success) {
      //   return null;
      // }

      if (onSuccess) {
        dispatch({type: onSuccess, payload: response.data});
      }
      // if()
    } catch (error) {
      dispatch(actions.apiCallFailed(error));
      if (onError) dispatch({type: onError, payload: error});
    }
  };
export default api;
