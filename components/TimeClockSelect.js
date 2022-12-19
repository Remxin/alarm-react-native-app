import { View, Text, StyleSheet, TouchableOpacity, Vibration, TouchableNativeFeedback } from 'react-native'
import React, { useState } from 'react'

const SingleCircle = ({ time, style, selectedNum, backgroundColor, setSelectedNum, minutes }) => {
    // const [isSelected, setIsSelected] = useState()
    const isSelected = selectedNum >= time && selectedNum < time + 5

    function handleOnPress() {
        if (!minutes) {
            setSelectedNum(time)
        } else {
            if (isSelected && selectedNum < time + 4) {
                setSelectedNum(p => p + 1)
            } else {
                setSelectedNum(time)
            }
        }
        Vibration.vibrate(100)
    }

    const watchSelected = minutes ? isSelected : selectedNum == time
    return (
        <TouchableNativeFeedback onPress={handleOnPress}>
            <View style={[styles.circle, style, { backgroundColor: watchSelected ? "white" : backgroundColor }]}>
                <Text>{time}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const TimeClockSelect = ({ style, array, clockRadius, circleWidth, circleColor, selectedNum, setSelectedNum, minutes = false }) => {
    return (
        <View style={[styles.container, style]}>
            {array.map((num, index) => {
                //180 - 1
                const x = Math.round(clockRadius * Math.cos(((index - 3) / 6) * Math.PI))
                const y = Math.round(clockRadius * Math.sin(((index - 3) / 6) * Math.PI))
                return <SingleCircle time={num} style={{ left: x + 170, top: y + 170, width: circleWidth, borderRadius: circleWidth / 2 }} key={num} selectedNum={selectedNum} setSelectedNum={setSelectedNum} backgroundColor={circleColor} minutes={minutes} />
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        aspectRatio: 1 / 1,
    },
    circle: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        color: "white",
        aspectRatio: 1 / 1
    }
})



export default TimeClockSelect