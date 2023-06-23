import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from "react-redux";
import { Colors } from '../contants';

const Gener = ({ data }) => {
    const { genres } = useSelector((state) => state.home);
    return (
        <View style={styles.genres}>
            {
                data?.map((g, index) => {
                    if (!genres[g]?.name) return;
                    return (
                        <Text style={styles.genre} key={index} >{genres[g]?.name}</Text>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    genres: {
        flexDirection: 'row',
        gap: 5,
        flexWrap: 'wrap'
    },
    genre: {
        backgroundColor: Colors.PINK,
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 14 * 1.4,
        flexWrap: 'wrap'
    }
})

export default Gener;