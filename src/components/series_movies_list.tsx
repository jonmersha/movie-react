import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Card, Button, Icon, Rating } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Video } from 'expo-av';

const MovieSeriesListPage = ({ navigation }) => {
  const [movieSeriesList, setMovieSeriesList] = useState([
    { id: 1, title: 'Main Movie Series', rating: 4.5, likes: 150, views: 500, liked: false, intro: 'Introduction to the main movie series.', progress: 80, videoUrl: 'https://service.besheger.com/movie/video/Found/s1e6.mp4',
     imageUrl: 'https://service.besheger.com/movie/image/Found/found.jpeg' },
    { id: 2, title: 'Movie Series 1', rating: 3.8, likes: 120, views: 300, liked: false, intro: 'Introduction to Movie Series 1.', progress: 60, imageUrl: 'https://service.besheger.com/movie/image/Found/found.jpeg' },
    { id: 3, title: 'Movie Series 2', rating: 4.2, likes: 200, views: 450, liked: true, intro: 'Introduction to Movie Series 2.', progress: 90, imageUrl: 'https://service.besheger.com/movie/image/Found/found.jpeg' },
    { id: 4, title: 'Movie Series 2', rating: 4.2, likes: 200, views: 450, liked: true, intro: 'Introduction to Movie Series 2.', progress: 90, imageUrl: 'https://service.besheger.com/movie/image/Found/found.jpeg' },
    { id: 5, title: 'Movie Series 2', rating: 4.2, likes: 200, views: 450, liked: true, intro: 'Introduction to Movie Series 2.', progress: 90, imageUrl: 'https://service.besheger.com/movie/image/Found/found.jpeg' },
    // Add more movie series items as needed
  ]);

  const [overallProgress, setOverallProgress] = useState(0);
  const videoRef = useRef(null);

  const handleLikeToggle = (id) => {
    const updatedList = movieSeriesList.map((item) =>
      item.id === id ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 } : item
    );
    setMovieSeriesList(updatedList);
  };

  const handleIndividualProgress = (id, newProgress) => {
    const updatedList = movieSeriesList.map((item) =>
      item.id === id ? { ...item, progress: newProgress } : item
    );
    setMovieSeriesList(updatedList);

    // Calculate overall progress
    const totalProgress = updatedList.reduce((acc, item) => acc + item.progress, 0);
    setOverallProgress(totalProgress / movieSeriesList.length);
  };

  const renderMovieSeries = ({ item }) => (
    <Card>
      <Card.Title>{item.title}</Card.Title>
      {item.videoUrl ? (
        <Video
          ref={videoRef}
          source={{ uri: item.videoUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
          style={{ width: '100%', height: 200 }}
        />
      ) : (
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: '100%', height: 200 }}
        />
      )}
      <Rating
        imageSize={20}
        readonly
        startingValue={item.rating}
      />
      <Text>{item.intro}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => handleLikeToggle(item.id)}>
          <FontAwesomeIcon
            name={item.liked ? 'thumbs-up' : 'thumbs-down'}
            size={30}
            color={item.liked ? '#007AFF' : 'red'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SeriesDetails', { id: item.id })}>
          <Icon name="eye" type="font-awesome" />
        </TouchableOpacity>
      </View>
      <Text>Likes: {item.likes}</Text>
      <Text>Views: {item.views}</Text>
      <Text>Progress: {item.progress}%</Text>
    </Card>
  );

  return (
    <View>
      {/* Main Movie Series */}
      <Card>
        <Card.Title>Main Movie Series</Card.Title>
        {movieSeriesList[0].videoUrl ? (
          <Video
            ref={videoRef}
            source={{ uri: movieSeriesList[0].videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={true}
            useNativeControls
            isLooping
            style={{ width: '100%', height: 200 }}
          />
        ) : (
          <Image
            source={{ uri: movieSeriesList[0].imageUrl }}
            style={{ width: '100%', height: 200 }}
          />
        )}
        <Rating
          imageSize={20}
          readonly
          startingValue={movieSeriesList[0].rating}
        />
        <Text>{movieSeriesList[0].intro}</Text>
        <Text>Likes: {movieSeriesList[0].likes}</Text>
        <Text>Views: {movieSeriesList[0].views}</Text>
        <Text>Overall Progress: {overallProgress}%</Text>
        <Button title="View Details" onPress={() => navigation.navigate('Details')} />
      </Card>

      {/* Movie Series List */}
      <FlatList
        data={movieSeriesList.slice(1)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieSeries}
      />
    </View>
  );
};

export default MovieSeriesListPage;
