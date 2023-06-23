import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Display } from '../../utiles'
import { FlashList } from '@shopify/flash-list'
import { Separator, Skeleton } from '../../components';
import { Colors } from '../../contants';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';

let load = true;

const Videos = ({ data, loading }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.videoContainer}>
            {data?.results?.length > 0 && <Text style={styles.title}>Official Videos</Text>}
            {
                !loading ? (<View style={{ flex: 1 }}>
                    {
                        data?.results?.length > 0 && (
                            <FlashList
                                data={data?.results}
                                // initialNumToRender={4}
                                estimatedItemSize={200}
                                horizontal
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                ListHeaderComponent={() => <Separator width={20} />}
                                ListFooterComponent={() => <Separator width={20} />}
                                ItemSeparatorComponent={() => <Separator width={20} />}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => {

                                            navigation.navigate("Video", { videoId: item.key })
                                        }} style={styles.castContainer}>
                                            <Image
                                                resizeMode='contain'
                                                style={styles.img}
                                                source={{ uri: `https://img.youtube.com/vi/${item.key}/mqdefault.jpg` }}
                                            />
                                            <EvilIcons style={styles.playicon} name='play' color={Colors.DEFAULT_WHITE} size={70} />
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        )
                    }
                </View>) : (<View style={{ flexDirection: 'row', gap: 10, marginVertical: 30 }}>
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
    videoContainer: {
        marginHorizontal: Display.setWidth(2),
        marginVertical: 30
    },
    title: {
        color: Colors.DEFAULT_WHITE, fontSize: 24, fontFamily: 'Poppins_500Medium', lineHeight: 24 * 1.4,
        marginVertical: 30

    },
    img: {
        width: Display.setWidth(50), height: Display.setWidth(40),
        borderRadius: Display.setWidth(5)
    },
    playicon: {
        alignSelf: 'center',
        position: 'relative',
        bottom: Display.setWidth(25)
    },
    videoTitle: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: 'Poppins_300Light'
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
        borderRadius: Display.setWidth(5)
    },
})

const SkeletonLoaing = () => {

    return (
        <View style={{}}>
            <View style={[styles.card, { width: Display.setWidth(50), borderRadius: Display.setWidth(5) }]}>
                <Skeleton style={{ borderRadius: Display.setWidth(5) }} height={Display.setWidth(40)} width={Display.setWidth(50)} />
            </View>
        </View>
    )
}


export default Videos