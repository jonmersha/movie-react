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

import { baseURL, device_height, device_width } from "../../utils/constants";
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

export const MovieSerie = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  //const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  //const [progress, setProgress] = useState(0);
  //const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  //const [isFullScreen, setIsFullScreen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = React.useRef(null);
  const [videoDetails, setVideos] = useState("");

  const [isLoading_, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState<MovieSeries[]>([]);

  const getSubMovies = async () => {
    try {
      const movieID = route.params.id;
      const response = await fetch(`${baseURL}/movie/sub/${movieID}`);
      // console.log(response.status);
      {
        response.status == 200 ? setJsons(response) : setData([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const setJsons = async (response) => {
    const json = await response.json();
    setData(json);
    if (json.length > 0)
      handlePlayPress(
        `${baseURL}${json[0].video_url}`,
        json[0].movie_description
      );
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
    if (device_height > device_width) {
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
            resizeMode={ResizeMode.STRETCH}
            shouldPlay={true}
            useNativeControls={true}
            onFullscreenUpdate={setOrientation}
            onLoad={onLoad}
            style={{
              aspectRatio: device_height / device_width,
            }}
          />
          {isLoading && (
            <View style={styles.circularProgress}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <View style={styles.videoBottom}>
            <Text style={text.title}>{videoDetails}</Text>

            {/* <View style={styles.likesViewsContainer}>
              <Text style={styles.likesViewsText}>{`Likes:`}</Text>
              <Text style={styles.likesViewsText}>{`Views: `}</Text>
            </View> */}

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
              {/* <Text style={styles.text}>Share</Text>
              <Text style={styles.text}>Download</Text>
              <Text style={styles.text}>Learn With</Text>
             */}
            </View>
          </View>
        </View>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <MovieCard
                {...item}
                onPressPlay={() =>
                  handlePlayPress(
                    `${baseURL}${item.video_url}`,
                    `${item.movie_description}`
                  )
                }
              />
            )}
            keyExtractor={(item) => item.ID}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text>The Select Movie Series Do not have contents</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
