import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { MoviesScreen } from '../screens/MoviesScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();
const tabBarOptions = {
    showLabel: false,
    activeTintColor: '#f6f6f6',
    style: {
        height: '10%'
    }
};

const RootNavigator = () => {
    const moviesTabOptions = {
        TabBarIcon: ({ color, size }) => (
            <MaterialIcons name="movie-filter" color={color} size={size} />
        )
    };

    const favoritesTabOptions = {
        TabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" color={color} size={size} />
        )
    };

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={tabBarOptions}>
                <Tab.Screen
                    name="Movies"
                    component={MoviesScreen}
                    options={moviesTabOptions}
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={favoritesTabOptions}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

export {
    RootNavigator
};