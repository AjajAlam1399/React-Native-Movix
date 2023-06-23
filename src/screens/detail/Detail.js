import { View, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { useFetch } from '../../hooks/UseFetch';
import { Separator, VideoPopUp } from '../../components'
import DetailBanner from './DetailBanner';
import { Colors } from '../../contants';
import { ScrollView } from 'react-native-gesture-handler';
import Cast from './Cast';
import Videos from './Videos';
import Similar from './Similar';
import Recomonded from './Recomonded';

const Detail = ({ route }) => {
    const { media_type, id } = route.params;
    const { data, loading } = useFetch(`/${media_type}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${media_type}/${id}/credits`
    );

    // console.log(media_type, id);

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={Colors.BLACK}
            />
            <Separator
                height={StatusBar.currentHeight}
            />
            <DetailBanner video={data?.results?.[0]} crew={credits?.crew} mediaType={media_type} id={id} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            {data?.results && <Videos data={data} loading={loading} />}
            <Similar mediaType={media_type} id={id} />
            <Recomonded mediaType={media_type} id={id} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    }
})

export default Detail