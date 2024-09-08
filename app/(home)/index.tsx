import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import WebView from 'react-native-webview';

export default function HomeScreen() {
  const customUserAgent = 'customUserAgent';

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: 'https://swimie.life' }}
        userAgent={customUserAgent}
        originWhitelist={['*']}
        scrollEnabled
        allowsInlineMediaPlayback
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  webview: {
    flex: 1,
  },
});
