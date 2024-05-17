import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routes } from "../utils/routes";
import Home from '../Screens/Home';
import Favourites from '../Screens/Favourites';
import NowPlaying from '../Screens/NowPlaying';
import UpComing from '../Screens/UpComing';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={routes.home} component={Home} />
            <Tab.Screen name={routes.nowplaying} component={NowPlaying} />
            <Tab.Screen name={routes.upcoming} component={UpComing} />
            <Tab.Screen name={routes.favorites} component={Favourites} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default BottomTabNavigator;
