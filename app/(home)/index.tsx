import { SafeAreaView, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: 'https://swimie.life' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
