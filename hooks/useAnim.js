import { Animated } from "react-native";

import { useRef } from "react";

const useAnim = (startVal, maxVal, duration) => {
    const ref = useRef(new Animated.Value(startVal)).current

    const start = () => {
        Animated.timing(ref, {
            toValue: maxVal,
            duration: duration,
            useNativeDriver: false
        }).start()
    }

    const end = () => {
        Animated.timing(ref, {
            toValue: startVal,
            duration: duration,
            useNativeDriver: false
        }).start()
    }

    return [ref, start, end]
}


export default useAnim