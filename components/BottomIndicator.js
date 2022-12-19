import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

function calculateToRealTime(time) {
    let days = 0
    let hours = 0
    let minutes = 0
    let seconds = 0

    let rest = time
    // console.log(rest / (60 * 60))
    if (rest / (24 * 60 * 60) > 1) {
        days = Math.floor(rest / (24 * 60 * 60))
        rest = rest % (24 * 60 * 60)
    }

    if (rest / (60 * 60) > 1) {
        hours = Math.floor(rest / (60 * 60))
        rest = rest % (60 * 60)
    }

    if (rest / (60) > 1) {
        minutes = Math.floor(rest / (60))
        rest = rest % (60)
    }

    seconds = rest

    days = days < 1 ? "" : days + " days"
    hours = hours < 1 ? "" : hours + " hours"
    minutes = minutes < 1 ? "" : minutes + " minutes"

    return `Alarm will ring after ${days} ${hours} ${minutes} ${seconds} seconds`


}

const BottomIndicator = ({ timeInSeconds, visible, setVisible }) => {
    const timeoutRef = React.useRef()

    React.useEffect(() => {
        if (!visible) return
        timeoutRef.current = setTimeout(() => {
            setVisible()
        }, 3000)
    }, [visible])


    if (!visible) return null

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{calculateToRealTime(timeInSeconds)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#232323bb"
    },

    text: {
        color: "white"
    }
})

export default BottomIndicator