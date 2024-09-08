import { SafeAreaView, StyleSheet } from 'react-native';
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
  },
  webview: {
    flex: 1,
  },
});
