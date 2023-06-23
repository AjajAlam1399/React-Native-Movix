import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../contants'
import { Separator } from '../components'
import Explore from '../components/Explore'
import { Display } from '../utiles'

const TV = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.BLACK}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <Explore mediaType={'tv'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK3,
    paddingBottom: Display.setHight(10)
  }
})

export default TV