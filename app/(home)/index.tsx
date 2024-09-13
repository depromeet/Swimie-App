import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar, BackHandler, Linking } from 'react-native';
import WebView from 'react-native-webview';

export default function HomeScreen() {
  const customUserAgent = Platform.OS === 'android'
  ? 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.127 Mobile Safari/537.36'
  : 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1';

  const webview = useRef<WebView>(null);
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const onPressHardwareBackButton = () => {
    if (webview.current && isCanGoBack) {
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
  }, [isCanGoBack]);

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
        injectedJavaScript={`
          (function() {
            function wrap(fn) {
              return function wrapper() {
                const res = fn.apply(this, arguments);
                window.ReactNativeWebView.postMessage('navigationStateChange');
                return res;
              }
            }
      
            history.pushState = wrap(history.pushState);
            history.replaceState = wrap(history.replaceState);
            window.addEventListener('popstate', function() {
              window.ReactNativeWebView.postMessage('navigationStateChange');
            });
          })();
      
          true;
        `}
        onMessage={({ nativeEvent: state }) => {
          if (state.data === 'navigationStateChange') {
            // Navigation state updated, can check state.canGoBack, etc.
            if(state.url.endsWith('/login') || state.url.endsWith('swimie.life/')) {
              setIsCanGoBack(false);
            } else {
              setIsCanGoBack(state.canGoBack);
            }
          }
        }}
        onShouldStartLoadWithRequest={(event) => {
          if(event.url.startsWith('kakaotalk')) {
            Linking.openURL(event.url);
            return false;
          }
          return true;
        }}
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
