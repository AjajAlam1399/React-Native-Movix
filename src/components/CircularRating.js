import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import { Colors } from '../contants';
import { Display } from '../utiles';
const CircularRating = ({ rating,size }) => {
    return (
        <View style={style.circleRating}>
            <CircularProgress
                value={rating}
                radius={size}
                duration={2000}
                progressValueColor={Colors.DEFAULT_WHITE}
                activeStrokeColor={rating < 5 ? "red" : rating < 7 ? "orange" : "green"}
                maxValue={10}
                activeStrokeWidth={6}
                inActiveStrokeWidth={10}
                inActiveStrokeColor={'#fff'}
            />
        </View>
    )
}

const style = StyleSheet.create({

})

export default CircularRating