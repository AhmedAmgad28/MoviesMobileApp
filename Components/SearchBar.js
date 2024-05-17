import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const onSubmitEditing = () => {
        // Navigate to the Search page and pass the search query
        navigation.navigate('Search', { searchQuery });
    };

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onSubmitEditing={onSubmitEditing} // Trigger search when the user submits the query
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
