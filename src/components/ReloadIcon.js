import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

function ReloadIcon({reloadFunction}) {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={reloadFunction} name={reloadIconName} color='#000000' size={30}/>
        </View>
    );
}

const styles = StyleSheet.create({
    reloadIcon:{
        top:80,
        right:28,
        position:'absolute'
    }
})

export default ReloadIcon;