import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../../contants'
import { Separator, Skeleton } from '../../components'
import Banner from './Banner'
import Popular from './Popular'
import TopRated from './TopRated'
import Trending from './Trending'
import { useFetch } from '../../hooks/UseFetch'
import { useSelector } from 'react-redux'
import { Display } from '../../utiles'
import { FlashList } from "@shopify/flash-list";

const Home = () => {
  // data fetching
  // const { data, loading, error } = useFetch("/movie/upcoming")
  const { data, loading } = useFetch(`/movie/popular`);
  let banarData = data?.results;
  // console.log(banarData)
  // get width
  const screenWidth = Dimensions.get('window').width;

  const [activeIndicator, setActiveIndicator] = useState(0);
  const load = true;
  // 
  const listRef = useRef();

  // pageScroll
  const handelScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = (scrollPosition) / screenWidth;
    // console.log(index);
    setActiveIndicator(index);


    // createing a state and seting the state with index  in scroll if(state===index) {style}
  }

  // auto scroll
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndicator === 19) {
        listRef.current.scrollToIndex({ index: 0, animation: true });

      }
      else {
        listRef.current.scrollToIndex({ index: activeIndicator + 1, animation: true })
      }
    }, 5000);
    return () => clearInterval(interval);
  },)
  // itemLayout
  const getItemLayout = (data, index) => (
    {
      length: screenWidth,
      offset: screenWidth * index,
      index: index
    }
  )

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.BLACK}
      />
      <Separator height={StatusBar.currentHeight} />
      {
        !loading ? (
          <View style={{ flex: 1 }}>
            {
              banarData && (
                <FlashList
                  data={banarData}
                  // initialNumToRender={3}
                  estimatedItemSize={200}
                  // ref={banerListRef}
                  keyExtractor={item => item?.id}
                  horizontal
                  ref={listRef}
                  pagingEnabled
                  onScroll={handelScroll}
                  getItemLayout={getItemLayout}
                  renderItem={({ item }) => <Banner {...item} />}
                />
              )
            }
          </View>
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={[styles.card, { width: Display.setWidth(96) }]}>
              <Skeleton style={{ borderRadius: 8 }} height={Display.setWidth(100)} width={Display.setWidth(96)} />
            </View>
          </View>
        )
      }
      <Separator height={70} />
      <Trending />
      <Popular />
      <TopRated />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK
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
export default Home