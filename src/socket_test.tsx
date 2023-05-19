import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    Button,
    TextInput
} from 'react-native';
import { connect as connectSocket } from 'socket.io-client';
import DropdownAlert from 'react-native-dropdownalert';

const socket = connectSocket("http://socket.pcrpallet.com", { 
  transports: ['websocket'], 
  forceNew: true, 
  secure: false, 
  upgrade: false,
  reconnection: true
});

const SocketTest = () => {

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
        <>
            <DropdownAlert
                ref={(ref) => {
                if (ref) {
                    dropDownAlertRef = ref;
                }
                }}
            />
            <Text>Default Room: 222</Text>
            <TextInput value={message} onChangeText={(value) => setMessage(value)} />
            <Button title='Socket.IO' onPress={() => {
                socket.emit("send_message", { message: message, room: '222' });
            }} />
            <Text>Received MSG: {rMsg}</Text>
        </>
    );
}

export default SocketTest;