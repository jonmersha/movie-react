// Updated Card.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export const MovieCard = ({ title, season, episode, banner, progress, likes, views, onPressPlay }) => {
  
  console.log(banner);
  return (
    <View style={styles.card}>
      <Image source={{ uri: banner }} style={styles.banner} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{`Season ${season}, Episode ${episode}`}</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{`Progress: ${progress}% watched`}</Text>
      </View>
      <View style={styles.likesViewsContainer}>
        <Text style={styles.likesViewsText}>{`Likes: ${likes}`}</Text>
        <Text style={styles.likesViewsText}>{`Views: ${views}`}</Text>
      </View>
      <TouchableOpacity 
      style={styles.playButton} 
      onPress={onPressPlay}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  banner: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  details: {
    fontSize: 16,
    color: '#555',
    paddingHorizontal: 16,
  },
  progressContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#333',
  },
  likesViewsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  likesViewsText: {
    fontSize: 14,
    color: '#555',
  },
  playButton: {
    backgroundColor: '#3498db',
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  playButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

