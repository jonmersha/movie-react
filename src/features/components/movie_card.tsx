// Updated Card.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../../utils/styles";
import { baseURL } from "../../utils/constants";
// interface MovieSeries {
//   ID: number;
//   Parent_ID: number;
//   titile: string;
//   movie_description: string;
//   image_url: string;
//   video_url: string;
//   epsode_: number;
//   season_: number;
// }

export const MovieCard = ({
  Parent_ID,
  titile,
  movie_description,
  image_url,
  video_url,
  epsode_,
  season_,
  onPressPlay,
}) => {
  //console.log(` this is banner image ${image_url}`);
  return (
    <TouchableOpacity onPress={onPressPlay}>
      <View style={styles.card}>
        <Image
          source={{ uri: `${baseURL}${image_url}` }}
          style={styles.banner}
        />
        <View>
          <Text style={styles.title}>{movie_description}</Text>
          <Text
            style={styles.details}
          >{`Season ${season_}, Episode ${epsode_}`}</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{`Progress: 43% watched`}</Text>
          </View>
          <View style={styles.likesViewsContainer}>
            <Text style={styles.likesViewsText}>{`Likes: `}</Text>
            <Text style={styles.likesViewsText}>{`Views: `}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
