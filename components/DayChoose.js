import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const DayChoose = ({ dayName, onSelectChange, isSelected }) => {
    const [selected, setSelected] = useState(isSelected)

    function onPress() {
        onSelectChange()
        setSelected(p => !p)
    }
  return (
    <TouchableOpacity style={[styles.container, selected ? styles.selected : styles.notSelected]} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.text}>{dayName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        aspectRatio: 1 / 1,
        borderRadius: 25,

        alignItems: "center",
        justifyContent: "center"
    },

    notSelected: {
        backgroundColor: "#220011",
    },

    selected: {
        backgroundColor: "#aa0099",
    },

    text: {
        color: "white"
    }
})

export default DayChoose