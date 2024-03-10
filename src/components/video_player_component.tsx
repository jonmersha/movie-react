import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

const VideoPlayer = ({ uri, videoRef, loading }) => {
  // const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  setIsLoading(loading);

  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((orientation) => {});
  }, []);

  const onBuffer = (bufferStatus) => {
    setIsLoading(bufferStatus.isBuffering);
  };

  const onLoad = (data) => {
    setIsLoading(false);
    setViews(data.totalDuration / 1000);
    setTotalDuration(data.totalDuration / 1000);
  };

  const onLikePress = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View>
      <Video
        ref={videoRef}
        source={{ uri: uri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay={true}
        useNativeControls={true}
        onFullscreenUpdate={setOrientation}
        onBuffer={onBuffer}
        onLoad={onLoad}
        style={{ width: Dimensions.get("window").width, height: 200 }}
      />

      {isLoading && (
        <View style={styles.circularProgress}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <View>
        <Text style={styles.text}>Vide title</Text>
        <Text>Vide title</Text>
        <Text>Vide title</Text>
      </View>
    </View>
  );
};

export default VideoPlayer;
const styles = StyleSheet.create({
  text: {
    color: "#FFF",
    fontSize: 20,
  },
  playerIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  circularProgress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
