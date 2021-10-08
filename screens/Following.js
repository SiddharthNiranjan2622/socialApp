import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import { useStore } from 'react-redux';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import UserList from '../components/UserList';
import {
  getUserFAndFData,
  selectFAndFData,
  selectUser,
} from '../store/slices/userSlice';
import {windowWidth} from '../utils/measurements';


function Following(props) {
  const store = useStore()
  const FAndFSelector = useSelector(selectFAndFData);
  const dispatch = useDispatch();
  useEffect(() => {
    getFAndFData();
  }, []);

  const getFAndFData = async () => {
    const userToken = await AsyncStorage.getItem('token');
    dispatch(getUserFAndFData(userToken));
  };

  // store.subscribe(()=>{
  //     console.log('loadingfandf ----------------------------------------',store.getState().userSlice.FAndFLoading)
      
  // })
  // setTimeout(() => {
  //     console.log('fandfselector--------------------------------',FAndFSelector.following)
  // }, 5000);

  return (
    
      <View style={styles.container}>
    <FlatList 
    data={FAndFSelector.Following}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item})=>(
        <UserList 
        fullName={item.fullName}
        profileImage={item.profileImage}
        />
    )}
    />
      </View>
      
      );
   
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor:'#ffffff'
  },
});

export default Following;
