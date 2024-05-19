import React, { memo, useState } from "react";
import { StyleSheet, View, Image, Pressable, Text, ImageBackground } from "react-native";
import { IconButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { routes } from "../utils/routes";
import { addFavorite, removeFavorite } from "../Redux/slices/FavouriteSlice";

const RelatedMovieCard = ({
  id: movieId,
  title,
  image,
  overview,
  poster,
  rate,
  date,
  genre,
}) => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const favoriteMovies = useSelector(state => state.favorites.favoriteMovies || []);
  const dispatch = useDispatch();

  const handleShowMovieDetails = () => {
    navigation.navigate(routes.movieDetails, {
      movieId,
      title,
      poster,
      overview,
      rate,
      date,
      genre,
    });
  };

  const toggleFavorite = () => {
    dispatch(
      favoriteMovies.some((movie) => movie.id === movieId)
        ? removeFavorite(movieId)
        : addFavorite({
            id: movieId,
            title,
            image,
            overview,
            poster,
            rate,
            date,
            genre,
          })
    );
  };

  const isFavorite = favoriteMovies.some((movie) => movie.id === movieId);

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={handleShowMovieDetails}
    >
      <View style={[styles.container, { opacity: isPressed ? 0.8 : 1 }]}>
      <ImageBackground
          source={{ uri: 'https://www.shutterstock.com/shutterstock/videos/1040586203/thumb/1.jpg?ip=x480' }}
          style={styles.backgroundImage}
        >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster}` }}
          style={styles.image}
        />
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            color={'white'}
            size={30}
            onPress={toggleFavorite}
          />
        </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#9900F0",
    elevation: 5,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 400,
    //aspectRatio: 365 / 250,
    borderRadius: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft:10,
  },
});

export default RelatedMovieCard;
