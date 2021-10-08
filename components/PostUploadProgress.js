import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress'


function PostUploadProgress({progress}) {
return (
<View style={[StyleSheet.absoluteFillObject,styles.container]}>
    <Progress.Bar progress={progress} width={200} />
</View>

);
}

const styles = StyleSheet.create({
container:{
justifyContent:'center',
alignItems:'center',
backgroundColor:'rgba(0,0,0,0.3)',
zIndex:1
}
})

export default  PostUploadProgress;