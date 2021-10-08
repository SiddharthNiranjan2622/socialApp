import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ThemeProvider, SearchBar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useStore} from 'react-redux';
import UserList from '../components/UserList';
import LottieView from 'lottie-react-native';
import {getOtherUserFAndFData, searchUser, selectSearchedUser} from '../store/slices/userSlice';
import axios from 'axios';

let timeOutId;

const debounce = (func, delay) => {
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

function SearchScreen({navigation}) {
  const [userData, setUserData] = useState();
  const [query, setQuery] = useState('');
  const store = useStore();
  const searchUserSelector = useSelector(selectSearchedUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  store.subscribe(() => {
  
    setLoading(store.getState().userSlice.searchUserLoading);

    if (store.getState().userSlice.searchedUser !== []) {
      setUserData(store.getState().userSlice.searchedUser.user);
    
    }
  });

  const handleSearch = async user => {
    // setQuery(user);
    const userToken = await AsyncStorage.getItem('token');

    dispatch(searchUser(userToken, user));
  };

  const handleChange = user => {
    setQuery(user);
    debounceSearch(user);
  };

  const debounceSearch = debounce(handleSearch, 500);

  const navigateToUser = async (item) =>{
    const userToken = await AsyncStorage.getItem('token');
    // console.log('item------------------------',item)
    dispatch(getOtherUserFAndFData(userToken,item._id))
    navigation.navigate('OtherUserProfile',item)
    
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="User Name"
        lightTheme
        onChangeText={text => handleChange(text)}
        value={query}
        showLoading={loading}
      />
      {!loading ? (
        <FlatList
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <UserList
              profileImage={item.profileImage}
              fullName={item.fullName}
              onPress={()=>navigateToUser(item)}
            />
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchScreen;
