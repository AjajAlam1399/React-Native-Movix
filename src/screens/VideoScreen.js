import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Display } from '../utiles';
import YoutubePlayer from 'react-native-youtube-iframe'
const VideoScreen = ({ route }) => {
    const { videoId } = route.params;
    // console.log(videoId);
    return (
        <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center' }}>
            <StatusBar
            barStyle={'light-content'}
            backgroundColor={'#000'}
            />
            
            <YoutubePlayer
                height={Display.setWidth(60)}
                play={false}
                videoId={`${videoId}`}
            />
        </View>
    )
}

export default VideoScreen