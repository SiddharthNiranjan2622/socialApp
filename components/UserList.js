import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function UserList({profileImage,fullName,onPress}) {
//   const [profileImage, setProfileImage] = useState();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.image}>
        {!profileImage ? (
          <Icon name="person-circle-sharp" size={60} color="#cccccc" />
        ) : (
          <Image
            style={{height: 60, width: 60, borderRadius: 60 / 2}}
            source={{uri: profileImage}}
          />
        )}
      </View>
      <View style={styles.name}>
        <Text style={{fontSize:18}}>{fullName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 70,
    width: '100%',
    // backgroundColor:'black',
    flexDirection: 'row',
    padding: 5,
  },
  image: {
      marginRight:10
  },
  name:{
    alignSelf:'center'
  }
});

export default UserList;
