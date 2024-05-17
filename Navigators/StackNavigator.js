import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../utils/routes";
import DrawerNavigation from './DrawerNavigator';
import BottomTabNavigator from "./BottomTabNavigator";
import MovieDetails from '../Screens/MovieDetails';
import Search from '../Screens/Search';
import Header from '../Components/Header';

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
          headerStyle: {
            backgroundColor: '#9900F0',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen name={routes.search} component={Search} options={{
          headerShown: false,
          header: () => <Header />,
        }}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;
