import messaging from '@react-native-firebase/messaging';
import { getPreference, setPreference } from './usePreference';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const getFCMToken = () => {
    let fcmToket = getPreference("fcmtoken");
    if(!fcmToket){
        try {
            // 
            let fcmToket = messaging().getToken().then((value) => {
                
                if(value){
                    setPreference("fcmtoken", value);
                }
            });
            console.log('token', fcmToket)
        } catch (error){
            console.log("error", error);
        }
    }
}

export const notificationListener = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log("Notification background state:", remoteMessage.notification);
    });

    messaging().getInitialNotification().then((remoteMessage) => {
        // if(remoteMessage){
        //     console.log("Notification quit state:", remoteMessage?.notification)
        // }
        console.log("Notification quit state:", remoteMessage)
    });

    messaging().onMessage(async (remoteMessage) => {
        console.log("Notification forground state...", remoteMessage);
    });
}