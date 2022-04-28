import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getMovies, addFavorite, removeFavorite } from '../redux/actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const MoviesScreen = () => {
    const { movies, favorites } = useSelector(state => state.moviesReducer);
    const dispatch = useDispatch();
    const fetchMovies = () => dispatch(getMovies());
    const addToFavorites = movie => dispatch(addFavorite(movie));
    const removeFromFavorites = movie => dispatch(removeFavorite(movie));

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleRemoveFavorite = movie => {
        return removeFromFavorites(movie);
    };

    const handleAddFavorite = movie => {
        return addToFavorites(movie);
    };

    const exists = movie => {
        if (favorites.filter(item => item.id === movie.id).length > 0) {
            return true;
        } else {
            return false;
        }
    };

    const MovieItem = ({ item }) => {
        const IMAGE_URL = `https://image.tmdb.org/t/p/w185${item.poster_path}`;
        return (
            <View style={{ marginVertical: 12 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                        source={{
                            uri: IMAGE_URL,
                        }}
                        resizeMode="cover"
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                    />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <View>
                            <Text style={{ fontSize: 22, paddingRight: 16 }}>
                                {item.title}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                alignItems: 'center',
                            }}>
                            <MaterialIcons color="green" name="thumb-up" size={32} />
                            <Text
                                style={{
                                    fontSize: 18,
                                    paddingLeft: 10,
                                    color: '#64676D',
                                }}>
                                {item.vote_count}
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    exists(item)
                                        ? handleRemoveFavorite(item)
                                        : handleAddFavorite(item)
                                }
                                activeOpacity={0.7}
                                style={styles.favoriteStyle}>
                                <MaterialIcons
                                    color="orange"
                                    size={32}
                                    name={exists(item) ? 'favorite' : 'favorite-outline'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    return (
        <View style={{ flex: 1, marginTop: 44, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 22 }}>Trending Movies</Text>
            <View style={{ flex: 1, marginTop: 12 }}>
                <FlatList data={movies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={MovieItem} showsVerticalScrollIndicator={false} />
            </View>
        </View>
    )
};

export {
    MoviesScreen
};