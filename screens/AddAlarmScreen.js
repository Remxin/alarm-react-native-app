import { View, Text, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import { useContext, useState, useMemo } from 'react'

// contexts
import { AlarmsContext } from '../contexts/AlarmsContext'

// components
import IconButton from '../components/IconButton'
import TimeClockSelect from '../components/TimeClockSelect'


const AddAlarmScreen = ({ navigation }) => {
  const { addAlarm } = useContext(AlarmsContext)
  const [selected, setSelected] = useState("hours") // or minutes
  // const [time, setTime] = useState({
  //   hours: 0,
  //   minutes: 0
  // })

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)

  function pushAlarm() {
    // h, m, selected, mon, tue, wed, thu, fri, sat, sun, onlyOnce // onlyOnce - play music?
    addAlarm(hours, minutes, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    navigation.navigate("home")
  }

  const Time = useMemo(() => {
    const hoursNum = hours < 10 ? "0" + hours : hours
    const minutesNum = minutes < 10 ? "0" + minutes : minutes
    return (
      <>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSelected("hours")}>
          <Text style={[styles.text, { color: selected === "hours" ? "pink" : "white" }]}>{hoursNum}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>:</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSelected("minutes")}>
          <Text style={[styles.text, { color: selected === "minutes" ? "pink" : "white" }]}>{minutesNum}</Text>
        </TouchableOpacity>
      </>
    )
  }, [hours, minutes, selected])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Time}
      </View>
      <View style={styles.content}>
        {selected === "hours" ? <>
          <TimeClockSelect style={{ width: 400, left: -200 }} clockRadius={150} circleWidth={60} array={[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} circleColor="pink" selectedNum={hours} setSelectedNum={setHours} />
          <TimeClockSelect style={{ width: 0, left: -185, top: 10 }} clockRadius={80} circleWidth={30} array={[0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]} circleColor="gray" selectedNum={hours} setSelectedNum={setHours} />
        </> : <>
          <TimeClockSelect style={{ width: 400, left: -200 }} clockRadius={150} circleWidth={60} array={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]} circleColor="pink" setSelectedNum={setMinutes} selectedNum={minutes} minutes={true} />
        </>}
      </View>
      <IconButton iconName="plus" style={styles.button} onPress={pushAlarm} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "purple"
  },

  text: {
    color: "white",
    fontSize: 30,
    textAlign: "center"
  },

  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },

  content: {
    flex: 5,
    position: "relative",
    // alignContent: "flex-start",
    // justifyContent: "flex-start",
    flexDirection: "column"
  },

  selectedText: {
    color: "pink"
  },

  button: {
    position: "absolute",
    bottom: 25,
    backgroundColor: "darlpink"
  }
})

export default AddAlarmScreen