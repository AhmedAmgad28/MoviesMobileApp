import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation, useNavigationState  } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, clearSearchResults } from '../Redux/slices/MoviesSlice';

const SearchBar = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const currentRoute = useNavigationState(state => state.routes[state.index].name);
    const searchResults = useSelector(state => state.movies.filteredMovies);

    const onChangeSearch = query => {
        setSearchQuery(query);
        dispatch(searchMovies(query));
    };

    const onSubmitEditing = () => {
        navigation.navigate('Search', { searchQuery });
    };

    const onPress = () => {
        if (currentRoute !== 'Search') {
            navigation.navigate('Search', { searchQuery });
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearSearchResults());
        };
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onSubmitEditing={onSubmitEditing}
                onPress={onPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    }
})

export default SearchBar;
