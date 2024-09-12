import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar, BackHandler } from 'react-native';
import WebView from 'react-native-webview';

export default function HomeScreen() {
  const customUserAgent = Platform.OS === 'android'
  ? 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.127 Mobile Safari/537.36'
  : 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1';

  const webview = useRef<WebView>(null);

  const onPressHardwareBackButton = () => {
    if (webview.current) {
      webview.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressHardwareBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardwareBackButton);
    }
  }, []);

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
        allowsBackForwardNavigationGestures
        ref={webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webview: {
    flex: 1,
  },
});
