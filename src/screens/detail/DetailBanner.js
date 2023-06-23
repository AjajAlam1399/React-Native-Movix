import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState, } from 'react'
import { useFetch } from '../../hooks/UseFetch';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Display } from '../../utiles';
import { useSelector } from 'react-redux'
import { Colors } from '../../contants';
import { Gener, CircularRating, Skeleton } from '../../components'
import { useNavigation } from '@react-navigation/native'
const DetailBanner = ({ video, crew, mediaType, id }) => {
    // console.log(mediaType, id);
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const { url } = useSelector((state) => state.home);
    const _genres = data?.genres?.map((g) => g.id);

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );
    let load = true;
    return (
        <View>

            {
                !loading ? (
                    <>
                        {
                            !!data && (
                                <React.Fragment>
                                    <Image
                                        resizeMode='contain'
                                        source={{ uri: url.backdrop + data.poster_path }}
                                        style={styles.poster}
                                    />
                                    <View style={{ marginHorizontal: Display.setWidth(2) }}>
                                        <Text style={styles.title}>{`${data.name || data.title}`}</Text>
                                        {
                                            data?.tagline && (
                                                <Text style={{ color: '#cac7c2', fontSize: 18, fontFamily: 'Poppins_400Regular_Italic', lineHeight: 18 * 1.4 }}>
                                                    {
                                                        data?.tagline
                                                    }
                                                </Text>
                                            )
                                        }
                                        <View style={{ marginVertical: 15 }}>
                                            <Gener data={_genres} />
                                        </View>
                                        <View style={styles.container2}>
                                            <CircularRating rating={data.vote_average} size={32} />
                                            <View style={styles.subcontainer2}>
                                                <EvilIcons
                                                    onPress={() => {
                                                        if(video?.key){
                                                            navigation.navigate("Video", { videoId: video.key })
                                                        }
                                                    }}
                                                    name='play' size={70} color={Colors.DEFAULT_WHITE} />
                                                <Text style={{ fontSize: 24, color: Colors.DEFAULT_WHITE, fontFamily: 'Poppins_400Regular' }}>Watch Trailer</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 20 }}>
                                            <Text style={styles.title}>Overview</Text>
                                            <Text style={styles.overview}>{data.overview}</Text>
                                        </View>
                                        <View style={styles.info}>
                                            {
                                                data.status && (
                                                    <View style={styles.infoItem}>
                                                        <Text style={styles.infoheading}>Status:</Text>
                                                        <Text style={styles.infoSubheadding}>{data.status}</Text>
                                                    </View>
                                                )
                                            }
                                            {
                                                data.release_date && (
                                                    <View style={styles.infoItem}>
                                                        <Text style={styles.infoheading}>Release Date:</Text>
                                                        <Text style={styles.infoSubheadding}>{data.release_date}</Text>
                                                    </View>
                                                )
                                            }
                                            {
                                                data.runtime && (
                                                    <View style={styles.infoItem}>
                                                        <Text style={styles.infoheading}>Runtime: </Text>
                                                        <Text style={styles.infoSubheadding}>{toHoursAndMinutes(data.runtime)}</Text>
                                                    </View>
                                                )
                                            }
                                        </View>

                                        {
                                            director?.length > 0 && (
                                                <View style={{ marginVertical: 15 }}>
                                                    <Text style={styles.infoheading}>Director: {director?.map((d, i) => <Text style={styles.infoSubheadding} key={i}> {d.name}
                                                        {director.length - 1 !== i && ", "}</Text>)}</Text>
                                                </View>

                                            )
                                        }
                                        {
                                            writer?.length > 0 && (
                                                <View style={{ marginVertical: 15 }}>
                                                    <Text style={styles.infoheading}>Writer: {writer?.map((d, i) => <Text style={styles.infoSubheadding} key={i}> {d.name}
                                                        {writer.length - 1 !== i && ", "}</Text>)}</Text>
                                                </View>
                                            )
                                        }
                                    </View>
                                </React.Fragment>
                            )
                        }
                    </>
                ) : (<SkeletonLoaing />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    poster: {
        width: Display.setWidth(96), height: Display.setHight(75), alignSelf: 'center', borderRadius: 15
    },
    title: {
        color: Colors.DEFAULT_WHITE, fontSize: 24, fontFamily: 'Poppins_500Medium', marginTop: 10, lineHeight: 24 * 1.4
    },
    date: {
        color: '#cac7c2', fontSize: 14, fontFamily: 'Poppins_300Light', lineHeight: 14 * 1.4
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15
    },
    subcontainer2: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    overview: {
        color: '#cac7c2', fontSize: 14, fontFamily: 'Poppins_400Regular_Italic', lineHeight: 14 * 1.4
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    infoheading: {
        fontSize: 18,
        color: Colors.DEFAULT_WHITE,
        lineHeight: 18 * 1.4,
        fontFamily: 'Poppins_500Medium'
    },
    infoSubheadding: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        fontFamily: 'Poppins_400Regular_Italic',
        color: '#cac7c2'
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={[styles.card, { width: Display.setWidth(96) }]}>
                <Skeleton style={{ borderRadius: 8 }} height={Display.setHight(75)} width={Display.setWidth(96)} />
            </View>
        </View>
    )
}

export default DetailBanner