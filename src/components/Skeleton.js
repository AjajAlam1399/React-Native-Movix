import { View, Text, Animated, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../contants";
const Skeleton = ({ width, height, style }) => {
    const translateX = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: width,
                useNativeDriver: true,
                duration: 1000,
            })
        ).start();
    }, [width]);
    return (
        <View
            style={StyleSheet.flatten([
                {
                    width: width,
                    height: height,
                    backgroundColor: '#0a2955',
                    overflow: "hidden",
                },
                style,
            ])}
        >
            <Animated.View
                style={{
                    width: "100%",
                    height: "100%",
                    transform: [{ translateX: translateX }],
                }}
            >
                <LinearGradient
                    style={{ width: "100%", height: "100%" }}
                    colors={["rgba(25,55,99,0)", "rgba(25,55,99,0)", "rgba(25,55,99,0.5)","rgba(25,55,99,0)"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0, 0.2, 0.6,1]}
                />
            </Animated.View>
        </View>
    );
};

/* 

const cardWidth = Dimensions.get("window").width * 0.97;
    const skiWidth = cardWidth - 32;

     <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={[style.card, { width: cardWidth }]}>
                    <Skeleton height={200} width={skiWidth} style={{ marginTop: 50 }} />
                </View>

     card: {
        backgroundColor: "#fff",
        elevation:3,
        padding:16,
        shadowColor:"black",
        shadowOffset:{
            width:0,
            height:3
        },
        shadowOpacity:0.24,
        shadowRadius:4,
        borderRadius:8
    }

*/

export default Skeleton;
