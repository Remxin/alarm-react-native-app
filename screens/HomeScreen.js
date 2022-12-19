import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native'
import React, { isValidElement, useContext, useEffect, useMemo } from 'react'
import IconButton from '../components/IconButton'

import { useIsFocused } from '@react-navigation/native'
import AlarmComp from '../components/AlarmComp'
import { AlarmsContext } from '../contexts/AlarmsContext'

const HomeScreen = ({ navigation }) => {
    const { alarms, getAlarms, wasRefresh } = useContext(AlarmsContext)
    const isFocused = useIsFocused()

    useEffect(() => {
        getAlarms()
    }, [isFocused])

    // const Alarms = useMemo(() => {

    // }, [isFocused, alarms])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollV}>
                {alarms?.rows._array.map((d) => {
                    return <AlarmComp data={d} key={d.id} />
                })}
            </ScrollView>
            <IconButton iconName="plus" style={{ bottom: 10 }} onPress={() => navigation.navigate("addAlarm")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: "green"
    },

    scrollV: {
        flex: 1,
        width: "100%",
    }
})

export default HomeScreen