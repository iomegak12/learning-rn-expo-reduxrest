import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { removeFavorite } from '../redux/actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const FavoritesScreen = () => {
    const { favorites } = useSelector(state => state.moviesReducer);
    const dispath = useDispatch();
    const removeFromFavorites = movie => dispath(removeFavorite(movie));
    const handleRemoveFavorite = movie => {
        removeFromFavorites(movie);
    };

    const exists = movie => {
        if (favorites.filter(item => item.id === movie.id).length > 0) {
            return true;
        } else {
            return false;
        }
    };

    const FavoriteItem = ({ item }) => {
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
                                onPress={() => handleRemoveFavorite(item)}
                                activeOpacity={0.7}
                                style={styles.favoriteStyle}>
                                <MaterialIcons
                                    color="orange"
                                    size={32}
                                    name="favorite"
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
            <Text style={{ fontSize: 22 }}>Your Favorites</Text>
            <View style={{ flex: 1, marginTop: 12 }}>
                <FlatList data={favorites}
                    keyExtractor={item => item.id.toString()}
                    renderItem={FavoriteItem} showsVerticalScrollIndicator={false} />
            </View>
        </View>
    )
};

export {
    FavoritesScreen
};