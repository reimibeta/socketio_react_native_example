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
import {
  SafeAreaView,
  // ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { connect as connectSocket } from 'socket.io-client';
import DropdownAlert from 'react-native-dropdownalert';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
//
const socket = connectSocket("http://socket.pcrpallet.com", { 
  transports: ['websocket'], 
  forceNew: true, 
  secure: false, 
  upgrade: false,
  reconnection: true
  // auth(cb) {
  //     cb({
  //       token: "abc"
  //     });
  // },
});
const App = () => {

  // const socket = connectSocket("http://10.0.2.2:3001");

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const [message, setMessage] = useState("");
  const [rMsg, setRmsg] = useState("none");

  useEffect(() => {
    socket.emit("join_room", '222');
    socket.on("receive_message", (data) => {
      setRmsg(data.message);
      dropDownAlertRef.alertWithType('success', 'Success', data.message);
    }); 
    // return () => {
    //   socket.off("receive_message", (data) => setRmsg('no more')); 
    // }
  }, [socket]);

  let dropDownAlertRef: any = useRef();

  return (
    <SafeAreaView style={backgroundStyle}>
      <DropdownAlert
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>Default Room: 222</Text>
      <TextInput value={message} onChangeText={(value) => setMessage(value)} />
      <Button title='Socket.IO' onPress={() => {
        socket.emit("send_message", { message: message, room: '222' });
      }} />
      <Text>Received MSG: {rMsg}</Text>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
