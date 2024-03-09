import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { MovieCard } from "../components/movie_card";

import { baseURL } from "../../utils/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoThumbnail from "../../components/video_thumb_nails";
import { styles, text } from "../../utils/styles";

interface MovieSeries {
  ID: string;
  Parent_ID: number;
  titile: string;
  movie_description: string;
  image_url: string;
  video_url: string;
  epsode_: number;
  season_: number;
}

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
  const [videoDetails, setVideos] = useState("");

  const [isLoading_, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState<MovieSeries[]>([]);

  const getSubMovies = async () => {
    try {
      const response = await fetch(`${baseURL}/movie/series/get`);
      const json = await response.json();
      setData(json);
      handlePlayPress(`${baseURL}${json[0].video_url}`, json[0].movie_description);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubMovies();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getSubMovies();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Refresh indicator will be visible for at least 1 second
  };

  const onLoad = (data) => {
    setIsLoading(false);
    // setIsPlaying(true);
    setViews(data.totalDuration / 1000);
    setTotalDuration(data.totalDuration / 1000);
  };

  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  const handlePlayPress = (item, title) => {
    setIsLoading(true);
    setSelectedVideo(item);
    setLikes(4);
    setViews(4);
    setVideos(title);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <Video
            ref={videoRef}
            source={{ uri: `${selectedVideo}` }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.COVER}
            shouldPlay={true}
            useNativeControls={true}
            onFullscreenUpdate={setOrientation}
            onLoad={onLoad}
            style={{ width: Dimensions.get("window").width, height: 200 }}
          />
          {isLoading && (
            <View style={styles.circularProgress}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <View style={styles.videoBottom}>
            <Text style={text.title}>{videoDetails}</Text>
            <View style={styles.likesViewsContainer}>
              <Text style={styles.likesViewsText}>{`Likes:`}</Text>
              <Text style={styles.likesViewsText}>{`Views: `}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "auto",
                backgroundColor: "black",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <Text style={styles.text}>Share</Text>
              <Text style={styles.text}>Download</Text>
              <Text style={styles.text}>Learn With</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MovieCard
              {...item}
              onPressPlay={() =>
                handlePlayPress(`${baseURL}${item.video_url}`, `${item.titile}`)
              }
            />
          )}
          keyExtractor={(item) => item.ID}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};
