import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useFetch } from '../../hooks/UseFetch';
import Carosel from '../../components/Carosel';
import { Colors } from '../../contants';
import { SwitchTab } from '../../components'
import { useNavigation } from '@react-navigation/native'


const TopRated = () => {
    const navigation = useNavigation();
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/top_rated`);
    const onTabChange = (tab) => {

        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };
    return (
        <View style={styles.carouselSection}>
            <View style={styles.headder}>
                <Text style={styles.carouselTitle}>Top Rated</Text>
                <SwitchTab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </View>
            <Carosel data={data?.results} loading={loading} endpoint={endpoint} navigate={(media_type, id) => {
                navigation.navigate("Detail", { media_type: media_type, id: id });
            }}  />
        </View>
    )
}

const styles = StyleSheet.create({
    carouselSection: {
        position: 'relative',
    },
    headder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 30
    },
    carouselTitle: {
        fontSize: 24,
        lineHeight: 24 * 1.4,
        fontFamily: 'Poppins_500Medium',
        color: Colors.DEFAULT_WHITE
    }
})

export default TopRated