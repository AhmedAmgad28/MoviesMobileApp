import React from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import MovieCard from '../Components/MovieCard';

const Favourites = () => {
    const favoriteMovies = useSelector((state) => state.favorites.favoriteMovies);

    return (
        <View style={styles.listContainer}>
            <View style={styles.container}>
                <ImageBackground
                    source={{ uri: 'https://img.freepik.com/premium-vector/purple-led-cinema-screen-movie-presentation-light-abstract-technology-background_42077-2466.jpg' }}
                    style={styles.backgroundImage2}
                >
                    <Text style={styles.title}>Favorites</Text>
                </ImageBackground>
            </View>
            <ImageBackground
                source={{ uri: 'https://img.freepik.com/free-photo/movie-background-collage_23-2149876005.jpg' }}
                style={styles.backgroundImage}
            >
                {favoriteMovies.length === 0 ? (
                    <ImageBackground
                        source={{ uri: 'https://tse3.mm.bing.net/th/id/OIG1.MQR7UDfKw2uvWhTFwy8b?pid=ImgGn' }}
                        style={styles.emptyMessageBackground}
                    >
                    </ImageBackground>
                ) : (
                    <FlatList
                        data={favoriteMovies}
                        renderItem={({ item }) => (
                            <MovieCard id={item.id} title={item.title} poster={item.poster} rate={item.vote_average} date={item.release_date} overview={item.overview}/>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.list}
                    />
                )}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: 'black',
        height: 50,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    backgroundImage2: {
        flex: 1,
        resizeMode: 'cover',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    emptyMessageBackground: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
    },
    emptyMessage: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    list: {
        marginLeft: 0,
    },
});

export default Favourites;
