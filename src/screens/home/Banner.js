import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Display } from '../../utiles'
import { Colors } from '../../contants'
import { useNavigation } from '@react-navigation/native'

const Banner = ({ poster_path, media_type, id }) => {

    const navigation = useNavigation();

    const { url } = useSelector(state => state.home);

    let path = url?.backdrop + poster_path;
    return (

        <TouchableOpacity activeOpacity={0.75} onPress={() => {
            navigation.navigate('Detail', { media_type: 'movie', id: id })
        }} style={style.container} >
            <Image
                source={{ uri: path }}
                style={style.img}
                resizeMode='contain'

            />
            {/* <Text style={style.title} >{original_title}</Text>
            <Text style={style.subtitle}> Release-Date : {release_date}</Text> */}

        </TouchableOpacity>

    )
}
const style = StyleSheet.create({
    container: {
        justifyContent: 'center', alignItems: 'center', width: Display.setWidth(100)
    },
    img: {
        width: Display.setWidth(96), height: Display.setHight(60),
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        color: Colors.DEFAULT_WHITE,
        fontFamily: 'Poppins_600SemiBold',
        position: 'absolute',
        bottom: 30,
    },
    subtitle: {
        fontSize: 12,
        color: Colors.DEFAULT_WHITE,
        fontFamily: 'Poppins_400Regular',
        position: 'absolute',
        bottom: 15,
    }
})

export default memo(Banner)