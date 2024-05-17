import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateToHome} style={styles.touchable}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Movies App</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 15,
        backgroundColor: 'black',
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Header;
