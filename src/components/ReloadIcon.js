import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

function ReloadIcon({getFollowers}) {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={getFollowers} name={reloadIconName} color='#ff304f' size={24}/>
        </View>
    );
}

const styles = StyleSheet.create({
    reloadIcon:{
        top:40,
        right:28,
        position:'absolute'
    }
})

export default ReloadIcon;