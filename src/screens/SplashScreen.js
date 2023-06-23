import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Images } from '../contants'
import { Display } from '../utiles'

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("HomeTabs")
        }, 4000)
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={Colors.BLACK}
                translucent
            />
            <Image
                source={Images.LOGO}
                style={styles.splashImg}
                resizeMode="contain"
            />
            <Text style={styles.textTitle}>MOVIX</Text>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BLACK
    },
    splashImg: {
        width: Display.setWidth(60),
        height: Display.setHight(30),
    },
    textTitle: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 30,
        fontFamily: "Poppins_400Regular",
    },

})

export default SplashScreen