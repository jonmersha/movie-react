import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainLayOut } from './src/layou';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MoviePlayer } from './src/features/Screens/movie_player';
import { VideoPlayer } from './src/features/video-player';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={MainLayOut}/>
      <Stack.Screen name="MyMoviePlayer" component={VideoPlayer}/>
      </Stack.Navigator>
   
</NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
