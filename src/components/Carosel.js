import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { Colors, Images } from '../contants';
import { CircularRating, Separator, Skeleton } from '../components';
import { useSelector } from "react-redux";
import { Display } from '../utiles';
import MovieCard from './MovieCard';
import { FlashList } from "@shopify/flash-list";

const SkeletonLoaing = () => {
    const cardWidth = Dimensions.get("window").width;
    return (
        <View style={{}}>
            <View style={[styles.card, { width: Display.setWidth(35) }]}>
                <Skeleton style={{ borderRadius: 8 }} height={Display.setWidth(70)} width={Display.setWidth(35)} />
            </View>
        </View>
    )
}


const Carosel = ({ data, loading, endpoint, title, navigate }) => {
    const { url } = useSelector((state) => state.home);
    // console.log(data);

    const load = true;
    return (
        <View style={styles.carousel}>
            {
                title && (
                    <Text style={styles.carouselTitle}>{title}</Text>
                )
            }
            {
                !loading ? (<>
                    <View style={{ flex: 1 }}>
                        {
                            data && (
                                <FlashList
                                    data={data}
                                    // initialNumToRender={4}
                                    estimatedItemSize={200}
                                    horizontal
                                    keyExtractor={item => item.id}
                                    showsHorizontalScrollIndicator={false}
                                    ListHeaderComponent={() => <Separator width={20} />}
                                    ListFooterComponent={() => <Separator width={20} />}
                                    ItemSeparatorComponent={() => <Separator width={20} />}
                                    renderItem={({ item }) => <MovieCard item={item} navigate={navigate} endpoint={endpoint} />}
                                />
                            )
                        }
                    </View>
                </>) : (<View style={{ flexDirection: 'row', gap: 5 }}>
                    <SkeletonLoaing />
                    <SkeletonLoaing />
                    <SkeletonLoaing />
                    <SkeletonLoaing />
                </View>)
            }
        </View>
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
        fontFamily: 'Poppins_500Medium',
        marginVertical: 20
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

export default Carosel