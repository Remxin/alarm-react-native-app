import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("home")}>
                <Text style={styles.title}>Alarm app</Text>
            </TouchableOpacity>
            <Text style={styles.text}>manage sqlite</Text>
            <Text style={styles.text}>use animation</Text>
            <Text style={styles.text}>use ring</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "purple",
    },

    title: {
        color: "white",
        fontSize: 50
    },

    text: {
        color: "white",
        fontSize: 20
    }
})
export default WelcomeScreen