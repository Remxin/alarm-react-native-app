import { View, Text } from 'react-native'
import React from 'react'

const FullScreenLoading = ({ text, visible }) => {
    if (!visible) return null
  return (
    <View>
      <Text>FullScreenLoading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    }
})

export default FullScreenLoading