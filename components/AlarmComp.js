import { View, Text, Switch, StyleSheet, TouchableOpacity, Animated, Vibration } from 'react-native'
import React, { useMemo, useState, useContext, useRef } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

// contexts
import { AlarmsContext } from '../contexts/AlarmsContext'

// hooks
import useAnim from '../hooks/useAnim'

// components
import DayChoose from './DayChoose'
import BottomIndicator from './BottomIndicator'

// audio
import { Audio } from 'expo-av';

// manager
import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'
import CronJob from 'react-native-cron-job'

// constants 
const dayTab = ['sun', "mon", 'tue', 'wed', 'thu', 'fri', 'sat']

// defining bgFetch
// TaskManager.defineTask("background-fetch", async () => {
//     const now = Date.now()
//     const { sound } = await Audio.Sound.createAsync(require('../assets/ringtone.mp3'))
//     await sound.setIsLoopingAsync(true)
//     await sound.playAsync();

//     return [BackgroundFetch.BackgroundFetchResult.NewData, sound]
// })

// async function unregisterBackgroundFetchAsync() {
//     return BackgroundFetch.unregisterTaskAsync("background-fetch");
// }


// cron
// const CronJobTask = async () => {

//     // Do your task here.

//     // Be sure to call completeTask at the end.
//     CronJob.completeTask();
// };

// function CronJobTask() {
//     Vibration.vibrate(1000 * 60)
//     CronJob.completeTask();
// }

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask('ALARM', () => CronJobTask);

const ALARM_MUSIC = require("../assets/ringtone.mp3")


const AlarmComp = ({ data }) => {
    const { changeAlarmSelection, changeDayRange, deleteRecord } = useContext(AlarmsContext)
    const [heightRef, expandHeight, shrinkHeight] = useAnim(0, 100, 500)
    const [expanded, setExpanded] = useState(false)
    const [isSelected, setIsSelected] = useState(!!data.selected)
    const [alarmMusic, setAlarmMusic] = useState({ isPlaying: false, sound: null })

    const [alarmTime, setAlarmTime] = useState(-1)

    const hours = data.hours < 10 ? "0" + data.hours : "" + data.hours
    const minutes = data.minutes < 10 ? "0" + data.minutes : "" + data.minutes

    const alarmTimeout = useRef()


    // ------------- background -----------------
    // const [isRegistered, setIsRegistered] = React.useState(false);
    // const [status, setStatus] = React.useState(null);

    // React.useEffect(() => {
    //     checkStatusAsync();
    // }, []);

    // const checkStatusAsync = async () => {
    //     const status = await BackgroundFetch.getStatusAsync();
    //     const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    //     setStatus(status);
    //     setIsRegistered(isRegistered);
    // };

    async function registerBackgroundFetchAsync() {
        return BackgroundFetch.registerTaskAsync('background-fetch', {
            minimumInterval: 60 * 15, // 15 minutes
            stopOnTerminate: false, // android only,
            startOnBoot: true, // android only
        });
    }





    // ------------------------------------------

    // ------- alarm ------
    function setAlarm() {

        const now = new Date()
        const todaysDay = now.getDay()



        let currDayIndex = 0

        for (let i = todaysDay; i < 8 + todaysDay; i++) {
            currDayIndex = i > 6 ? i - 7 : i
            // ___ works
            if (!!data[dayTab[currDayIndex]]) {
                const desiredDay = new Date(new Date(now.getFullYear(), now.getMonth(), now.getDate(), data.hours, data.minutes).getTime() + ((i - todaysDay) * 1000 * 60 * 60 * 24))
                const sub = Math.round((desiredDay - now) / 1000)
                if (sub > 0) { // setAlarmToday
                    setAlarmTime(sub)
                    clearTimeout(alarmTimeout.current)
                    alarmTimeout.current = setTimeout(async () => {
                        if (alarmMusic.isPlaying) {
                            try {

                                const { sound } = await Audio.Sound.createAsync(require('../assets/ringtone.mp3'))
                                setAlarmMusic(p => ({ ...p, sound }));
                                Vibration.vibrate(1000 * 60, true)
                                await sound.setIsLoopingAsync(true)
                                await sound.playAsync();

                                // setAlarm()

                                setTimeout(async () => {
                                    Vibration.cancel()
                                    sound.unloadAsync()
                                }, 60000)
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    }, 1000 * sub)
                    return
                }
            }
            //_________
        }

    }


    function removeAlarm() {
        clearTimeout(alarmTimeout.current)
        Vibration.cancel()
        alarmMusic.sound?.unloadAsync()
    }

    // --------------------

    function manageSize() {
        if (expanded) {
            setExpanded(false)
            shrinkHeight()
            return
        }

        setExpanded(true)
        expandHeight()
    }

    async function changeSelect() {
        if (!isSelected) {
            setAlarm()
        } else {
            removeAlarm()
        }

        await changeAlarmSelection(data.id, !isSelected)
        setIsSelected(p => !p)
    }

    async function manageDelete() {
        await deleteRecord(data.id)
    }

    const DaysElement = useMemo(() => {

        return dayTab.map(day => {
            return <DayChoose dayName={day} isSelected={!!data[day]} key={day} onSelectChange={async () => {
                await changeDayRange(data.id, day, !data[day])
                // setAlarm()
                setIsSelected(false)
            }} />
        })
    }, [expanded])

    return (
        <View>
            <View style={[styles.container]} >
                <View style={[styles.row, { flex: 2 }]}>
                    <View style={[styles.column, { flex: 4 }]}>
                        <Text style={styles.time}>{hours}:{minutes}</Text>
                        {alarmMusic.isPlaying ? <Text style={styles.smallText}>Music enabled</Text> : null}
                    </View>
                    <View style={styles.column}>
                        <Switch value={isSelected} onChange={changeSelect} trackColor="#110011" ios_backgroundColor="#440088" thumbColor="#220011" />
                        <Switch value={alarmMusic.isPlaying} onChange={() => setAlarmMusic(p => ({ ...p, isPlaying: !p.isPlaying }))} trackColor="#110011" ios_backgroundColor="#440088" thumbColor="#220011" />
                    </View>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity>
                        <Icon name="trash" size={30} style={{ color: "white" }} onPress={manageDelete} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="angle-down" size={30} style={{ color: "white" }} onPress={manageSize} />
                    </TouchableOpacity>
                </View>
            </View>
            <Animated.View style={[styles.bottomRow, { height: heightRef }]}>
                {DaysElement}
            </Animated.View>
            <BottomIndicator visible={alarmTime > -1} timeInSeconds={alarmTime} setVisible={() => setAlarmTime(-1)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        height: 140,
        backgroundColor: "#323",
        padding: 10
    },

    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    column: {
        flex: 1,
        flexDirection: "column",
        // borderWidth: 1,
        // borderColor: "black",
        justifyContent: "center",
        alignItems: "center"
        // justifyContent: "space-evenly",
    },

    time: {
        color: "white",
        fontSize: 30
    },

    smallText: {
        color: "white",
        fontSize: 10
    },

    bottomRow: {
        backgroundColor: "#323",
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    }
})

export default AlarmComp