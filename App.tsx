/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, type PropsWithChildren, useEffect, useRef} from 'react';
import { SafeAreaView, View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SocketTest from './src/socket_test';
import PushNotificationTest from './src/push_notification_test';

const App = () => {


  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <SocketTest /> */}
      <PushNotificationTest />
    </SafeAreaView>
  );
};

export default App;
