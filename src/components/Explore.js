import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../services/Api'
import { Colors, Images } from '../contants';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from "react-redux";
import { CircularRating, Separator } from '../components'
import { Display } from '../utiles';
import { FlashList } from '@shopify/flash-list'

const Explore = ({ mediaType }) => {
    const navigation = useNavigation();
    const { url } = useSelector((state) => state.home);

    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);

    const [loading2, setLoading2] = useState(false);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        setLoading2(true);
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
                setLoading2(false);
            }
        ).catch((error) => {
            setLoading2(false);
        });
    };
    useEffect(() => {
        fetchInitialData();
        setPageNum(1);
        setData(null);
    }, [mediaType])

    return (
        <View>
            {
                loading && <ActivityIndicator size={60} color={Colors.ORANGE} />
            }
            {
                !loading && (
                    <>
                        {
                            <ScrollView horizontal
                                showsHorizontalScrollIndicator={false}
                                directionalLockEnabled={true}
                                alwaysBounceVertical={false}
                                contentContainerStyle={{
                                    flex:1
                                }}
                            >

                                {
                                    data?.results?.length > 0 && (
                                        <FlashList
                                            data={data?.results}
                                            keyExtractor={item => item.id}
                                            onEndReached={() => {
                                                fetchNextPageData();
                                            }}
                                            onEndReachedThreshold={1}
                                            ListHeaderComponent={() => <Text style={styles.Texttitle}>
                                                {
                                                    mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"
                                                }
                                            </Text>}
                                            ListFooterComponent={() => <>
                                                {
                                                    loading2 && <ActivityIndicator style={{marginBottom:Display.setHight(8)}} size={60} color={Colors.ORANGE} />
                                                }
                                            </>}
                                            estimatedItemSize={200}
                                            contentContainerStyle={{
                                                width: Display.setWidth(100),
                                                alignItems: 'center'
                                            }}
                                            numColumns={2}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}

                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity
                                                        activeOpacity={0.85}
                                                        style={{ flexDirection: 'column', margin: 20 }} onPress={() => {
                                                            navigation.navigate('Detail', { media_type: mediaType, id: item.id })
                                                        }}>
                                                        <View>
                                                            <Image
                                                                source={item.poster_path ? { uri: url.poster + item.poster_path } : Images.NO_POSTER}
                                                                style={{ width: Display.setWidth(40), height: Display.setWidth(55), borderRadius: 15 }}
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
                                            }}
                                        />
                                    )
                                }

                            </ScrollView>


                        }
                    </>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    Texttitle: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 28,
        lineHeight: 28 * 1.4,
        marginVertical: 30,
        width: Display.setWidth(100),
        paddingLeft: 20,
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
})

export default Explore