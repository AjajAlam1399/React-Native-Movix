import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { useSelector } from "react-redux";
import { Colors, Images } from '../contants';
import { CircularRating,  } from '.';
import { Display } from '../utiles';
const MovieCard = ({ item, navigate, endpoint }) => {
    const { url } = useSelector((state) => state.home);
    // console.log(item.media_type || endpoint);
    return (
        <TouchableOpacity activeOpacity={0.85} onPress={() => {
            navigate(item.media_type || endpoint, item.id)
        }} style={{ flexDirection: 'column' }}>
            <View>
                <Image
                    source={item.poster_path ? { uri: url.poster + item.poster_path } : Images.NO_POSTER}
                    style={{ width: Display.setWidth(35), height: Display.setWidth(55), borderRadius: 15 }}
                    resizeMode='contain'
                />
                <View style={styles.rating}>
                    <CircularRating rating={item.vote_average.toFixed(1)} size={Display.setWidth(6)} />
                </View>
            </View>
            <View style={styles.textBlock}>
                <Text style={styles.title}>{item.title?.length > 10 ? (item.title?.slice(0, 10) + "...") : (item.title)} {item.name?.length > 10 ? (item.name?.slice(0, 10) + "...") : (item.name)}</Text>
                <Text style={styles.date}>{item.release_date || item.first_air_date}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    carousel: {
        marginBottom: 50
    },
    carouselTitle: {
        fontSize: 24,
        lineHeight: 24 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: 'Poppins_500Medium'
    },
    rating: {
        position: 'relative',
        bottom: Display.setWidth(7),
        // borderWidth: 1,
        // borderColor: '#fff'
    }, textBlock: {
        flexDirection: 'column',
        // borderWidth: 1,
        // borderColor: '#fff',
        position: 'relative',
        bottom: Display.setWidth(5)
    },
    title: {
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: 'Poppins_400Regular',
        color: Colors.DEFAULT_WHITE
    },
    date: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: "Poppins_300Light"
    },
    card: {
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        borderRadius: 8
    },
})

export default MovieCard;