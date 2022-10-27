import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ViewCompany = ({route}) => {
  return (
    <View>
      <Text>ViewCompany</Text>
      <Text>{route.params.paramKey}</Text>
    </View>
  )
}

export default ViewCompany

const styles = StyleSheet.create({})