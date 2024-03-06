import React from "react";
import {StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { MovieList } from "./features/Screens/movie_list";

export const MainLayOut=({navigation})=>{

  const [searchQuery, setSearchQuery] = React.useState('');
    return(
    <>
    <View style={styles.appBar} >
        <Searchbar  
        placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}>

        </Searchbar>
    </View>
    <View style={styles.body}>
        <MovieList navigation={navigation} />
   
    </View>
    
    
    </>
    
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