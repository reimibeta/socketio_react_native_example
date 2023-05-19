import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Alert, Button } from "react-native";
// import { notificationListener, requestUserPermission } from "./utils/push_notification_helper";
import messaging from '@react-native-firebase/messaging';
import Notifications from "./utils/notifications";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
};


const PushNotificationTest = () => {

    // useEffect(() => {
    //     requestUserPermission();
    //     // notificationListener();
    //     messaging().getInitialNotification().then((remoteMessage) => {
    //         // if(remoteMessage){
    //         //     console.log("Notification quit state:", remoteMessage?.notification)
    //         // }
    //         console.log("Notification quit state:", remoteMessage?.notification)
    //     });
    //     // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //     //     console.log('A new FCM message arrived!', remoteMessage);
    //     // });
    //     // // console.log(unsubscribe);
    //     // return unsubscribe;
    //     // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //     //     console.log('Message handled in the background!', remoteMessage);
    //     // });
    // }, []);
    // const [date, setDate] = useState(new Date());
    // const setNotification = () => {
    //   // Notifications.schduleNotification(date);
    //   notifications.schduleNotification(new Date(Date.now() + 1 * 1000));
    // };

    useEffect(() => {
        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                // process the notification

                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function(err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }, []);

    return (
        <View>
            <Text style={{ 
            }}>Notification Push</Text>
            <Button
                title="Set notification after 5 seconds"
                onPress={() => {
                    console.log('click')
                    // Notifications.schduleNotification(new Date(Date.now() + 1 * 1000));
                    // Notifications.notify()
                    // PushNotification.localNotificationSchedule({
                    //     channelId: 'reminders',
                    //     title: '🔔 Reminder!',
                    //     message: 'You have set this reminder',
                    //     date: new Date(Date.now() + 1 * 1000)
                    // });
                    PushNotification.localNotification({
                        channelId: 'reminders',
                        title: '🔔 Reminder!',
                        message: 'You have set this reminder',
                    });
                }}
            />
        </View>
    );
}

export default PushNotificationTest;