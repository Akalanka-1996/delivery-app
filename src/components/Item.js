import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Item = ({title}) => {
  return (
    <View>
    <Text style={styles.title}>{title}</Text>

    </View>
  )
}

export default Item

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'blue',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
})