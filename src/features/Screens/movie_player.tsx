import * as ScreenOrientation from 'expo-screen-orientation'
import React ,{useRef,useState,useEffect} from 'react';
import { Dimensions,StyleSheet,Text ,View,TouchableOpacity} from 'react-native';
import {ResizeMode,Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { setStatusBarHidden } from 'expo-status-bar';
import { baseURL } from '../../utils/constants';

export const MoviePlayer=({VidoeURL={}})=> {
    console.log(VidoeURL)
    const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const setOrientation = async () => {
      if (isFullscreen) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    };

    setOrientation();
    return () => {
        // Reset the screen orientation when the component unmounts
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
      };
    }, [isFullscreen]);
  
    const toggleFullscreen = async () => {
      if (videoRef.current) {
        if (!isFullscreen) {
          await videoRef.current.presentFullscreenPlayer();
        } else {
          await videoRef.current.dismissFullscreenPlayer();
        }
        setIsFullscreen(!isFullscreen);
      }
    };
  return (
    
    <VideoPlayer
   //style={styles.video}
  videoProps={{
    shouldPlay: true,
    resizeMode: ResizeMode.CONTAIN,
    collapsable:true,
    
    source: {
      uri: `${baseURL}/movie/Video/Found/Found S1, E1 - Pilot.mp4`,
    },
  }}
  
/>
//  <View style={styles.container}>
//       <Video
//         ref={videoRef}
//         source={{ uri: `${baseURL}/movie/Video/Found/Found S1, E1 - Pilot.mp4` }} // Replace with your video URL
//         style={isFullscreen ? styles.fullscreenVideo : styles.videoPlayer}
//         useNativeControls={false}
//       />
//       <TouchableOpacity style={styles.fullscreenButton} onPress={toggleFullscreen}>
//         <Text>{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</Text>
//       </TouchableOpacity> 
//     </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    videoPlayer: {
      flex: 1,
    },
    fullscreenVideo: {
     // width: '100%',
     // height: 100%',
      //aspectRatio:9/16,
    },
    fullscreenButton: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 10,
      borderRadius: 5,
    },
  });
  