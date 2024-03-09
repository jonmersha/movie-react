import React, { useState } from "react";
import { Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YouTube from "react-native-youtube";

export const YoutubePlay = () => {
  const state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    playerWidth: Dimensions.get("window").width,
  };
  const _youTubeRef = React.createRef();

  const [isReady, setReadyState] = useState(false);

  return (
    <SafeAreaView>
      <Text>Youtube Implementation Come Soon</Text>
    </SafeAreaView>
  );
};
