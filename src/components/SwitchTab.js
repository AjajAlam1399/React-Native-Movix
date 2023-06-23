import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../contants';

const SwitchTab = ({ data, onTabChange }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeTab = (tab, index) => {
        setActiveIndex(index);
        onTabChange(tab);
    };
    // console.log(activeIndex);
    return (
        <View style={styles.SwitchTabContainer}>
            {
                data.map((tab, index) =>
                (
                    <Text style={[styles.tabitem, { backgroundColor: activeIndex == index ? Colors.ORANGE : "transparent" }]} key={index}
                        onPress={() => {
                            activeTab(tab, index)
                        }}
                    >
                        {tab}
                    </Text>
                )
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    SwitchTabContainer: {
        width: 200,
        backgroundColor: Colors.BLACK2,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#fff",
        flexDirection: 'row',
        height: 35,
        alignItems: 'center',
        paddingHorizontal:1,
        alignItems:'center',
        paddingVertical:1
    },
    tabitem: {
        width: "50%",
        color: '#fff',
        zIndex: 2,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        paddingVertical: 4,
        fontFamily:'Poppins_300Light',
    },

    active: {

        backgroundColor: Colors.ORANGE,
    }
})

export default SwitchTab