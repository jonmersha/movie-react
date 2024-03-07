import React, { useState, useRef, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { MovieCard } from '../features/components/movie_card';

import { baseURL } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoPlayer from './video_player_component';
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoThumbnail from './video_thumb_nails';


const data = [
  {
    id: '1',
    title: 'Found',
    season: 1,
    episode: 1,
    banner: `${baseURL}"/movie/image/Found/found.jpeg`,
    progress: 50,
    likes: 120,
    views: 500,
    videoUrl: `${baseURL}/movie/video/Found/s1e1.mp4`,
  },
  {
    id: '2',
    title: 'Found',
    season: 1,
    episode: 2,
    banner: `${baseURL}"/movie/image/Found/found.jpeg`,
    progress: 50,
    likes: 120,
    views: 500,
    videoUrl: `${baseURL}/movie/video/Found/s1e2.mp4`,
  },
  
];

export const MovieSerie = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = React.useRef(null);
  const [videoDetails,setVideos]= useState('');


    const onLoad = (data) => {
        setIsLoading(false);
        setViews(data.totalDuration / 1000);
        setTotalDuration(data.totalDuration / 1000);
      };
    

    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
          }
          else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
          }
      }
  const handlePlayPress = (item) => {
    setIsLoading(true);
    setSelectedVideo(item.videoUrl);
    setVideos(`${item.title} 2003, Season ${item.season} Ep ${item.episode}`)
  };
  const onBuffer = (bufferStatus) => {
    setIsLoading(bufferStatus.isBuffering);

  };
  const renderThumbNails =(url, calback)=>(
    <VideoThumbnail videoUrl={url} onPress={calback}/>
  )
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
         <View>
      <Video
        ref={videoRef}
        source={{uri: selectedVideo} }
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay={true}
        useNativeControls={true}
        onFullscreenUpdate={setOrientation}
        onBuffer={onBuffer}
        onLoad={onLoad}
        style={{width: Dimensions.get('window').width, height: 200}}
      />
      {isLoading && (
        <View style={styles.circularProgress
             }>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
<View  style={styles.videoBottom}>
    <Text style={styles.text}>{videoDetails}</Text>
    <Text style={styles.text}>Vide title</Text>
</View>
      
    </View>
      <FlatList
        data={data}
         renderItem={({ item }) => <MovieCard {...item} onPressPlay={() => handlePlayPress(item)} />}
        //renderItem={({item})=>renderThumbNails(item.videoUrl,handlePlayPress(item))}
        keyExtractor={(item) => item.id}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    videoBottom:{
        height:50,
        backgroundColor:'black'
    },
  container: {
    flex: 1,
  },

  videoPlayer: {
    width: '100%',
    height: 200,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  text:{
    color: '#FFF',
    fontSize:20,
    fontWeight:'400'
},
playerIcon:{
 position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: 20,

},
circularProgress:{
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center' }
});


  