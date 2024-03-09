import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { baseURL } from "../../utils/constants";
import { styles } from "../../utils/styles";

export const MoviePlayer = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const onLoad = (data) => {
    setIsLoading(false);
    setViews(data.totalDuration / 1000);
    setTotalDuration(data.totalDuration / 1000);
  };
  const onBuffer = (bufferStatus) => {
    setIsLoading(bufferStatus.isBuffering);
  };

  //console.log(route.params.paramKey)
  function setOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      navigation.goBack();
      return true;
    });
  });
  setOrientation();
  return (
    <View style={styles.video}>
      <Video
        ref={video}
        source={{ uri: route.params.paramKey }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        useNativeControls={true}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onFullscreenUpdate={setOrientation}
        onLoad={onLoad}
        style={styles.video}
      />
      {isLoading && (
        <View style={styles.circularProgress}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </View>
  );
};
