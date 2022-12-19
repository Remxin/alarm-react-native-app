import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const IconButton = ({ iconName, style, onPress }) => {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={[styles.container, style]}>
                <Icon name={iconName} size={80} style={styles.icon} />
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple",
        height: 100,
        borderRadius: 60,
        aspectRatio: 1 / 1
    },

    icon: {
        color: "white"
    }
})

export default IconButton