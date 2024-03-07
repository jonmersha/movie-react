import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';
import { baseURL } from '../utils/constants';
//import { createThumbnail } from "react-native-create-thumbnail";

 const VideoThumbnail = ({ videoUrl, onPress }) => {
    console.log(videoUrl)


  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text>{baseURL}/movie/image/Found/found.jpeg</Text>
     <Image source={{ uri: `${baseURL}/movie/image/Found/found.jpeg` }} style={{width:100,height:100}}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  thumbnail: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  loadingText: {
    color: 'gray',
    marginTop: 5,
  },
  videoTitle: {
    marginTop: 5,
  },
});

export default VideoThumbnail;
