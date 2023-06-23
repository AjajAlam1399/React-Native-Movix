import { View, Text } from "react-native";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen,Detail,VideoScreen} from "../screens";
import { getApiConfig } from "../redux/HomeAction";
import { getGenres } from "../redux/HomeSlice";
import { fetchDataFromApi } from "../services/Api";

import HomeTabs from "./BottomTabs";

const Stack = createStackNavigator();

const Navigator = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getApiConfig("/configuration"));
        genresCall();
    }, []);

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        // console.log(data);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="Video" component={VideoScreen} />
            </Stack.Navigator>


        </NavigationContainer>
    )
}

export default Navigator;