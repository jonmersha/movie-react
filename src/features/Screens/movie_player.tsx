
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, BackHandler } from 'react-native';
import { Video,ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { baseURL } from '../../utils/constants';

 export const MoviePlayer=({navigation,route})=>{
  
 //console.log(route.params.paramKey)
    function setOrientation() {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            return true;
    }
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    useEffect(() => {
     BackHandler.addEventListener('hardwareBackPress', function () {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      navigation.goBack()
      return true;

    });

    })
    setOrientation();
    return (
      <View style={styles.video}>
      <Video
        ref={video}
        source={{ uri: route.params.paramKey}}
        shouldPlay
        isLooping
        onFullscreenUpdate={setOrientation}
        
        useNativeControls={true}
        resizeMode = {ResizeMode.COVER}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        style={styles.video}
      />  
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    flex:1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});