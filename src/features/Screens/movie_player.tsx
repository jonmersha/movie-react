
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

export const MoviePlayer=({VidoeURL={}})=>{

    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            //Device is in portrait mode, rotate to landscape mode.
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
          }
          else {
            //Device is in landscape mode, rotate to portrait mode.
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
          }

    }
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
      <View style={styles.containers}>
        <Video
          source={{ uri: 'https://service.besheger.com/movie/video/Found/Found S1, E1 - Pilot.mp4' }}
          //resizeMode="cover"
          shouldPlay
          onFullscreenUpdate={setOrientation}
          useNativeControls
          style={{ width: Dimensions.get('window').width,height:Dimensions.get('window').height }}
        /> 
      </View>);
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    video: {
      alignSelf: 'center',
      width: 320,
      height: 200,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });