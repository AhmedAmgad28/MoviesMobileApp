import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import MovieCard from '../Components/MovieCard';

const Home = ({ movies }) => {
    return (
        <View style={styles.listContainer}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard id={item.id} title={item.title} poster={item.poster_path} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: 'black',
      },
})

export default Home;
