import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import MovieCard from '../Components/MovieCard';

const Favourites = () => {
    const favoriteMovies = useSelector((state) => state.favorites.favoriteMovies);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites</Text>
            {favoriteMovies.length === 0 ? (
                <Text style={styles.emptyMessage}>No favorite movies yet.</Text>
            ) : (
                <FlatList
                    data={favoriteMovies}
                    renderItem={({ item }) => (
                        <MovieCard id={item.id} title={item.title} poster={item.poster} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
    },
    title: {
        color: 'mintgreen',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyMessage: {
        color: 'mintgreen',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    list: {
        paddingBottom: 20,
    },
});

export default Favourites;
