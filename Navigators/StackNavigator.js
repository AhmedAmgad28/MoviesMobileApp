import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../utils/routes";
import DrawerNavigation from './DrawerNavigator';
import BottomTabNavigator from "./BottomTabNavigator";
import MovieDetails from '../Screens/MovieDetails';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.tab}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.movieDetails}
        component={MovieDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
