import { useEffect, useState, useContext } from "react";
import * as SQLite from 'expo-sqlite';

const useAlarms = () => {
    const [database, setDatabase] = useState(null)
    const [connected, setConnected] = useState(false)
    const [alarms, setAlarms] = useState(alarms)
    const [wasRefresh, setWasRefresh] = useState(false)

    function addRecord(h, m, selected, mon, tue, wed, thu, fri, sat, sun, onlyOnce) {
        if (!database) return
        return new Promise((resolve, reject) => {
            database.transaction(tx => {
                tx.executeSql(`INSERT INTO alarms (hours, minutes, selected, mon, tue, wed, thu, fri, sat, sun, onlyOnce) VALUES (${h}, ${m}, ${selected}, ${mon}, ${tue}, ${wed}, 
                ${thu}, ${fri}, ${sat}, ${sun}, ${onlyOnce})`, [], async (ts, result) => {
                    await getRecords()
                    resolve(true)
                })
            })
        })
    }

    function deleteRecord(recordId) {
        if (!database) return
        return new Promise(async (resolve, reject) => {
            database.transaction((tx) => {
                tx.executeSql(`DELETE FROM alarms WHERE id='${recordId}'`, [], async (ts, result) => {
                    await getRecords()
                    setWasRefresh(p => !p)
                    resolve(true)
                })
            })
        })
    }

    function getRecords() {
        if (!database) return
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM alarms"
            database.transaction(tx => {
                tx.executeSql(query, [], (tx, result) => {
                    setAlarms(result)
                    resolve(true)
                })
            })
        })
    }

    function changeAlarmSelection(alarmId, isSelected) {
        if (!database) return
        return new Promise((resolve, reject) => {
            database.transaction(tx => {
                tx.executeSql(`UPDATE alarms SET selected=${+isSelected} WHERE id='${alarmId}'`, [], () => {
                    getRecords()
                    resolve(true)
                })
            })
        })
    }

    function changeDayRange(alarmId, day, isSelected) {
        if (!database) return
        return new Promise((resolve, reject) => {
            database.transaction(tx => {
                tx.executeSql(`UPDATE alarms SET ${day}=${+isSelected} WHERE id='${alarmId}'`, [], () => {
                    getRecords()
                    resolve(true)
                })
            })
        })
    }

    useEffect(() => {
        const db = SQLite.openDatabase("nabaglo_dawid_4i12.db", "", "", undefined, (d) => {
            setDatabase(d)
            setConnected(true)
        })


        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alarms (id integer PRIMARY KEY NOT NULL, hours INTEGER DEFAULT 0, minutes INTEGER DEFAULT 0, selected INTEGER DEFAULT 0, mon INTEGER DEFAULT 0, tue INTEGER DEFAULT 0, wed INTEGER DEFAULT 0, thu INTEGER DEFAULT 0, fri INTEGER DEFAULT 0, sat INTEGER DEFAULT 0, sun INTEGER DEFAULT 0, onlyOnce INTEGER DEFAULT 0);"
            );
        });

    }, [])

    useEffect(() => {
        if (!database) return
        getRecords()
    }, [database])

    // useEffect(() => {
    //     setAlarmsContext(alarms)
    // }, [alarms])

    return { connected, addRecord, alarms, getRecords, database, changeAlarmSelection, changeDayRange, deleteRecord, wasRefresh }
}

export default useAlarms