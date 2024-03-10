import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { baseURL, device_height, device_width } from "../utils/constants";

interface CardProps {
  title: string;
  movie_description: string;
  view_number: number;
  likes_number: number;
  rating: number;
  image_url: string;
  video_url: string;
  is_series: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  rating,
  movie_description,
  image_url,
  view_number,
  likes_number,
  is_series,
}) => (
  <View style={styles.card}>
    <Image style={styles.image} source={{ uri: `${baseURL}${image_url}` }} />
    <View style={styles.cardContent}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{movie_description}</Text>
    </View>
    <View style={styles.viewsLikesContainer}>
      <StarRatingDisplay maxStars={5} rating={rating} starSize={20} />
      <Text style={styles.viewsLikesText}>Views:{view_number}</Text>
      <Text style={styles.viewsLikesText}>Likes:{likes_number}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    margin: 10,
    // height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,

    aspectRatio: 9 / 16,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  viewsLikesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 20,
  },
  viewsLikesText: {
    fontSize: 14,
    color: "#800",
  },
});

export default Card;
