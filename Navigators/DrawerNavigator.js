import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { routes } from '../utils/routes';
import BottomTabNavigator from './BottomTabNavigator';
import Home from '../Screens/Home';
import Favourites from '../Screens/Favourites';

const drawer= createDrawerNavigator()

const DrawerNavigator = () => {
    return (
        <drawer.Navigator>
            <drawer.Screen name={routes.home} component={Home}></drawer.Screen>
            <drawer.Screen name={routes.favorites} component={Favourites}></drawer.Screen>
        </drawer.Navigator>
    );
}

const styles = StyleSheet.create({})

export default DrawerNavigator;
