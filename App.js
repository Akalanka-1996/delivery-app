import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import registerNNPushToken from 'native-notify';

export default function App() {
  registerNNPushToken(4158, '4sG8bYl9NogKQhcKIJUZ8C');
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
