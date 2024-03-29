import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

export default function App() {

  /**
   * Change screen orientation to LANDSCAPE_LEFT
   */
  changeScreenOrientation();
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  /**
   * Request camera and audio permissions
   */
  const [hasPermission, setHasPermission] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: audioStatus } = await Audio.requestPermissionsAsync();
      setHasPermission(cameraStatus === 'granted' && audioStatus === 'granted');
    })();
  }, []);

  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://suara.pre.basetis.com' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

});
