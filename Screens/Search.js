import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { searchMovies, clearSearchResults } from '../Redux/slices/MoviesSlice';
import MovieCard from '../Components/MovieCard';
import SearchBar from '../Components/SearchBar';

const Search = ({ route }) => {
    const { searchQuery } = route.params;
    const dispatch = useDispatch();
    const filteredMovies = useSelector(state => state.movies.filteredMovies);

    useEffect(() => {
        // Dispatch the searchMovies action when the component mounts
        dispatch(searchMovies(searchQuery));

        return () => {
            // Clear the search results when the component unmounts
            dispatch(clearSearchResults());
        };
    }, [dispatch, searchQuery]);

    return (
        <View style={styles.listContainer}>
            <View style={styles.container}>
                <ImageBackground
                    source={{ uri: 'https://img.freepik.com/premium-vector/purple-led-cinema-screen-movie-presentation-light-abstract-technology-background_42077-2466.jpg' }}
                    style={styles.backgroundImage2}
                >
                    <Text style={styles.title}>Search</Text>
                    <SearchBar />
                </ImageBackground>
            </View>
            <ImageBackground
                source={{ uri: 'https://img.freepik.com/free-photo/movie-background-collage_23-2149876005.jpg' }}
                style={styles.backgroundImage}
            >
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={filteredMovies}
                        renderItem={({ item }) => (
                            <MovieCard 
                                id={item.id} 
                                title={item.title} 
                                poster={item.poster_path} 
                                overview={item.overview}
                                rate={item.vote_average}
                                date={item.release_date}
                                genre={item.genre_ids}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
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
        height: 120,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    backgroundImage2: {
        flex: 1,
        resizeMode: 'cover',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
});

export default Search;
