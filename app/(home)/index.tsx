import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Dimensions, Platform } from 'react-native';
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  const customUserAgent = Platform.OS === 'android'
  ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
  : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75';
  return (
    <>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.webview}
          source={{ uri: 'https://swimie.life' }}
          userAgent={customUserAgent}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
