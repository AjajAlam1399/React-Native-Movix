import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Home, Movies, Search, TV } from '../screens'
import { Colors } from '../contants'
import { Display } from '../utiles'


const BottomTab = createBottomTabNavigator();

export default () => {
    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                height: Display.setHight(8),
                borderTopWidth: 0,
                backgroundColor: '#000'
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: Colors.DEFAULT_WHITE,
            tabBarInactiveTintColor: 'grey',

        }}>
            <BottomTab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={23} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen name='Movie' component={Movies}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="movie-open-outline" size={26} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen name='TV' component={TV}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-tv-outline" size={26} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen name='Search' component={Search}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="search-outline" size={26} color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}

