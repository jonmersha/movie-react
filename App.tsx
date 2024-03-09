import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { MainLayOut } from "./src/layou";
//import { NavigationContainer } from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MoviePlayer } from "./src/features/Screens/movie_player";
import * as ScreenOrientation from "expo-screen-orientation";
//import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieSeriesListPage from "./src/components/series_movies_list";
import { MovieSerie } from "./src/features/Screens/series_list";

const Stack = createNativeStackNavigator();

//const Stack = createNativeStackNavigator();

export default function App() {
  function setOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  setOrientation();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainLayOut}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyMoviePlayer"
          component={MoviePlayer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieSeriesListPage"
          component={MovieSerie}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
