import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

// screens
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import AddAlarmScreen from './screens/AddAlarmScreen';

// navigation
const MainStack = createNativeStackNavigator()

// contexts
import { AlarmsContext } from './contexts/AlarmsContext';


// hooks
import useAlarms from './hooks/useAlarms';


// config 
const headerOpt = {
  headerStyle: {
    backgroundColor: "purple",
  }
}

export default function App() {

  const { alarms, addRecord, getRecords, changeAlarmSelection, changeDayRange, deleteRecord, wasRefresh } = useAlarms()

  return (
    <AlarmsContext.Provider value={{ alarms, addAlarm: addRecord, getAlarms: getRecords, changeAlarmSelection, changeDayRange, deleteRecord, wasRefresh }}>
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <MainStack.Screen name="home" component={HomeScreen} options={headerOpt} />
          <MainStack.Screen name="addAlarm" component={AddAlarmScreen} options={headerOpt} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AlarmsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
