import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { routes } from "../utils/routes";
import Home from '../Screens/Home';
import Favourites from '../Screens/Favourites';
import NowPlaying from '../Screens/NowPlaying';
import UpComing from '../Screens/UpComing';
import Header from '../Components/Header';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case routes.home:
                            iconName = 'home-outline';
                            break;
                        case routes.nowplaying:
                            iconName = 'play-outline';
                            break;
                        case routes.upcoming:
                            iconName = 'calendar-outline';
                            break;
                        case routes.favorites:
                            iconName = 'heart-outline';
                            break;
                        default:
                            iconName = 'ellipse-outline';
                            break;
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#9900F0',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: 'black',
                    paddingBottom: 6,
                    paddingTop: 2,
                    height: 57,
                },
            })}
        >
            <Tab.Screen
                name={routes.home}
                component={Home}
                options={{
                    header: () => <Header />,
                }}
            />
            <Tab.Screen
                name={routes.nowplaying}
                component={NowPlaying}
                options={{
                    header: () => <Header />,
                }}
            />
            <Tab.Screen
                name={routes.upcoming}
                component={UpComing}
                options={{
                    header: () => <Header />,
                }}
            />
            <Tab.Screen
                name={routes.favorites}
                component={Favourites}
                options={{
                    header: () => <Header />,
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;
