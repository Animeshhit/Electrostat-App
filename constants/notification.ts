import * as Notifications from "expo-notifications";

const sendLocalNotification = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: null, // send immediately
  });
};

export default sendLocalNotification;
