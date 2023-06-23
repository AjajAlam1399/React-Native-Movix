import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFetch } from '../../hooks/UseFetch';
import { Colors, Images } from '../../contants';
import { SwitchTab, CircularRating, Separator, Skeleton } from '../../components'
import { Display } from '../../utiles';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from "react-redux";
import Carosel from '../../components/Carosel';
const Trending = () => {
    const navigation = useNavigation();
    const [endpoint, setEndPoint] = useState("day");
    const { loading, data } = useFetch(`/trending/all/${endpoint}?page=2`);
    const onTabChange = (tab) => {
        setEndPoint(tab === "Day" ? "day" : "week");
    };

    // const navigation_handler = (media_type, id) => {
    //     navigation.navigate("Details", { media_type: media_type, id: id });
    // }
    return (
        <View style={styles.carouselSection}>
            <View style={styles.headder}>
                <Text style={styles.carouselTitle}>Trending</Text>
                <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
            </View>
            <Carosel data={data?.results} loading={loading} navigate={(media_type, id) => {
                navigation.navigate("Detail", { media_type: media_type, id: id });
            }} endpoint={endpoint} />
        </View>
    )
}


// const SkeletonLoaing = () => {
//     const cardWidth = Dimensions.get("window").width;
//     const skiWidth = cardWidth - 20;
//     return (
//         <View style={{}}>
//             <View style={[styles.card, { width: Display.setWidth(35) }]}>
//                 <Skeleton style={{ borderRadius: 8 }} height={Display.setWidth(70)} width={Display.setWidth(35)} />
//             </View>
//         </View>
//     )
// }


// const Carosel = ({ data, loading, endpoint, title, navigate }) => {
//     const { url } = useSelector((state) => state.home);
//     // console.log(data);
//     const load = true;
//     return (
//         <View style={styles.carousel}>
//             {
//                 title && (
//                     <Text style={styles.carouselTitle}>{title}</Text>
//                 )
//             }
//             {
//                 !loading ? (<>
//                     <FlatList
//                         data={data}
//                         initialNumToRender={5}
//                         horizontal
//                         keyExtractor={item => item.id}
//                         showsHorizontalScrollIndicator={false}
//                         ListHeaderComponent={() => <Separator width={20} />}
//                         ListFooterComponent={() => <Separator width={20} />}
//                         ItemSeparatorComponent={() => <Separator width={20} />}
//                         renderItem={({ item }) => {
//                             const posterUrl = item.poster_path
//                                 ? url.poster + item.poster_path
//                                 : Images.NO_POSTER;
//                             return (
//                                 <TouchableOpacity onPress={() => {
//                                     navigate(item.media_type || endpoint, item.id)
//                                     // navigation.navigate('Detail', { mediaType: item.media_type || endpoint, id: item.id })
//                                 }} style={{ flexDirection: 'column' }}>
//                                     <View>
//                                         <Image
//                                             source={item.poster_path ? { uri: url.poster + item.poster_path } : Images.NO_POSTER}
//                                             style={{ width: Display.setWidth(35), height: Display.setWidth(55), borderRadius: 15 }}
//                                             resizeMode='contain'
//                                         />
//                                         <View style={styles.rating}>
//                                             <CircularRating rating={item.vote_average.toFixed(1)} />
//                                         </View>
//                                     </View>
//                                     <View style={styles.textBlock}>
//                                         <Text numberOfLines={1} style={styles.title}>{item.title?.length > 10 ? (item.title?.slice(0, 10) + "...") : (item.title) || item.name?.length > 10 ? (item.name?.slice(0, 10) + "...") : (item.name)}</Text>
//                                         <Text style={styles.date}>{item.release_date || item.first_air_date}</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                             )
//                         }}
//                     />
//                 </>) : (<View style={{ flexDirection: 'row', gap: 5 }}>
//                     <SkeletonLoaing />
//                     <SkeletonLoaing />
//                     <SkeletonLoaing />
//                     <SkeletonLoaing />
//                 </View>)
//             }
//         </View>
//     )
// }



const styles = StyleSheet.create({
    carouselSection: {
        position: 'relative',
    },
    headder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 30
    },
    carouselTitle: {
        fontSize: 24,
        lineHeight: 24 * 1.4,
        fontFamily: 'Poppins_500Medium',
        color: Colors.DEFAULT_WHITE
    },
    carousel: {
        marginBottom: 50
    },
    carouselTitle: {
        fontSize: 24,
        lineHeight: 24 * 1.4,
        color: Colors.DEFAULT_WHITE,
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

export default Trending