import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../contants';

import { Display } from '../utiles';
import YoutubePlayer from 'react-native-youtube-iframe'


const VideoPopUp = ({ show, setShow, vidoId, setVideoId }) => {
    // console.log(show, vidoId);
    const [visible, setVisible] = React.useState(false);
    // const hideModal = () => {
    //     setShow(false);
    //     setVideoId(null);
    // };
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'transparent' };

    return (

        <PaperProvider>
            <Portal style={{ backgroundColor: 'transparent' }} >
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <TouchableOpacity activeOpacity={0.7} onPress={hideModal}>
                        <Ionicons style={styles.close} name='close-outline' size={40} color={Colors.DEFAULT_WHITE} />
                    </TouchableOpacity>
                    <View style={styles.videoContainer}>
                        <YoutubePlayer
                            height={Display.setWidth(50)}
                            play={false}
                            videoId={`rjUam63KcmY`}

                        />
                    </View>
                </Modal>

            </Portal>
            <Button style={{ marginTop: 30 }} onPress={showModal}>
                Show
            </Button>
        </PaperProvider>

    )
}
const styles = StyleSheet.create({
    close: {
        // borderWidth: 1,
        // borderColor: 'red',
        alignSelf: 'flex-end'
    },

})

export default VideoPopUp