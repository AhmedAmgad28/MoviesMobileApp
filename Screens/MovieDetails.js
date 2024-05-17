import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable, ScrollView, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { getSimilarMovies } from '../Redux/slices/MoviesSlice';
import { addFavorite, removeFavorite } from '../Redux/slices/FavouriteSlice';
import MovieCard from '../Components/MovieCard';

const MovieDetails = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const { movieId, title, poster, rate, date, overview, genre } = route.params;
    const { similarMovies } = useSelector((state) => state.movies);
    const favoriteMovies = useSelector((state) => state.favorites.favoriteMovies);
    const isFavorite = favoriteMovies.some((movie) => movie.id === movieId);

    useEffect(() => {
        dispatch(getSimilarMovies(movieId));
    }, [dispatch, movieId]);

    const toggleFavorite = () => {
        dispatch(
            isFavorite
                ? removeFavorite(movieId)
                : addFavorite({
                    id: movieId,
                    title,
                    poster,
                    rate,
                    date,
                    overview,
                    genre,
                })
        );
    };

    const getRatingColor = (rating) => {
        if (rating > 7.5) return 'green';
        if (rating >= 5) return 'yellow';
        return 'red';
    };

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://img.freepik.com/free-photo/movie-background-collage_23-2149876005.jpg' }}
                style={styles.backgroundImage}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.posterContainer}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${poster}` }} style={styles.image} />
                        <IconButton
                            icon={isFavorite ? 'heart' : 'heart-outline'}
                            color={'white'}
                            size={30}
                            onPress={toggleFavorite}
                            style={styles.favoriteIcon}
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.infoContainer}>
                            <View style={[styles.ratingContainer, { backgroundColor: getRatingColor(rate) }]}>
                                <Text style={styles.ratingText}>{rate}</Text>
                            </View>
                            <Text style={styles.info}>Release Date: {date}</Text>
                        </View>
                        <Text style={styles.overview}>{overview}</Text>
                    </View>
                    <Text style={styles.similarTitle}>Related Movies</Text>
                    <FlatList
                        data={similarMovies}
                        renderItem={({ item }) => (
                            <MovieCard
                                id={item.id}
                                title={item.title}
                                poster={item.poster_path}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        contentContainerStyle={styles.similarList}
                    />
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    contentContainer: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    posterContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 500,
        borderRadius: 10,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    detailsContainer: {
        padding: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    ratingContainer: {
        padding: 5,
        borderRadius: 5,
    },
    ratingText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    info: {
        color: 'white',
        fontSize: 16,
    },
    overview: {
        color: 'white',
        fontSize: 16,
        marginVertical: 10,
    },
    similarTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 10,
    },
    similarList: {
        paddingLeft: 10,
    },
});

export default MovieDetails;
