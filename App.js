import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import registerNNPushToken from 'native-notify';

export default function App() {
  registerNNPushToken(4476, 'm37QpgFObNzeXojUEArcmr');
  return (
    <View style={styles.container}>
      <Text>kasun akalanka</Text>
      <StatusBar style="auto" />
    </View>
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
