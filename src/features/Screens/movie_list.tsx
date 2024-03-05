import React,{useEffect, useState} from "react";
import { FlatList, RefreshControl, TouchableOpacity, StyleSheet, Text, TextInput, View } from "react-native";
import Card from "../../components/movie_card_component";
import { baseURL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";


interface MovieItem{
    ID:string;
    titile:string;
    movie_description :string;
    view_number :number;
    likes_number: number;
    rating :number;
    image_url:string;
    video_url:string;
    is_series:boolean;
}
export const MovieList=()=>{
  const navigation = useNavigation();

    const [isLoading, setLoading,] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState<MovieItem[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch(`${baseURL}/movie/get`);
      
      console.log(response)
      
      
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getMovies();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Refresh indicator will be visible for at least 1 second
  };
  const handleItemPress = (item: MovieItem) => {
    navigation.navigate('MyMoviePlayer', {VidoeURL: item.video_url});
  };
  const renderCard = ({ item }: { item: MovieItem }) => (

    <TouchableOpacity onPress={() => handleItemPress(item)}>

    
    <Card
          title={item.titile}
          rating={item.rating}
          movie_description={item.movie_description}
          image_url={item.image_url}
          view_number={item.view_number}
          likes_number={item.likes_number}
          is_series={item.is_series} 
          video_url={""}    />
          </TouchableOpacity>
  );
  const [searchQuery, setSearchQuery] = React.useState('');
    return(
    <FlatList
      data={data}
      renderItem={renderCard}
      keyExtractor={(item) => item.ID}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      // Other FlatListProps can be added here
    />
    
    
    
    
);
}

const styles=StyleSheet.create({
    appBar:{
        //height:40,
        backgroundColor:'white',
        padding:20  
    },
    body:{
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:20

    },
    textInput:{
        backgroundColor:'white',
        fontSize:30,
        elevation:5
        
    },
    card:{
        height:200,
        backgroundColor:'white',
        margin:5,
        elevation:5
    }
})