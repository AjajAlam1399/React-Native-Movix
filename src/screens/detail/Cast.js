import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Display } from '../../utiles'
import { FlashList } from '@shopify/flash-list'
import { useSelector } from "react-redux";
import { Separator, Skeleton } from '../../components';
import { Colors, Images } from '../../contants';

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    return (
        <View style={styles.castContiner}>
            <Text style={styles.title}>Top Cast</Text>
            {
                !loading ? (<View style={{ flex: 1 }}>
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
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.castContainer}>
                                            <Image
                                                resizeMode='contain'
                                                style={styles.img}
                                                source={item.profile_path ? { uri: url.profile + item.profile_path } : Images.AVATAR}
                                            />
                                            <Text style={styles.name}>{item.name}</Text>
                                            <Text style={styles.character}>{item.character}</Text>
                                        </View>
                                    )
                                }}
                            />
                        )
                    }
                </View>) : (<View style={{ flexDirection: 'row', gap: 10,marginVertical:30 }}>
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
    castContiner: {
        marginHorizontal: Display.setWidth(2),
        marginVertical: 30
    },
    title: {
        color: Colors.DEFAULT_WHITE, fontSize: 24, fontFamily: 'Poppins_500Medium', marginTop: 10, lineHeight: 24 * 1.4
    },
    castContainer: {
        marginVertical: 30,
        alignItems: 'center'
    },
    img: {
        width: Display.setWidth(40), height: Display.setWidth(40), borderRadius: Display.setWidth(20)
    },
    name: {
        fontSize: 16,
        lineHeight: 16 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: 'Poppins_500Medium'
    },
    character: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: '#cac7c2',
        fontFamily: 'Poppins_400Regular'
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
const SkeletonLoaing = () => {
    return (
        <View style={{}}>
            <View style={[styles.card, { width: Display.setWidth(40), borderRadius: Display.setWidth(20) }]}>
                <Skeleton style={{ borderRadius: 8, borderRadius: Display.setWidth(20) }} height={Display.setWidth(40)} width={Display.setWidth(40)} />
            </View>
        </View>
    )
}

export default Cast