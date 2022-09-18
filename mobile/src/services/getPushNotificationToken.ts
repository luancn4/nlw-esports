import * as Notifications from 'expo-notifications';

export const getPushNotificationToken = async () => {
  const { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    await Notifications.requestPermissionsAsync();
  }

  if (granted) {
    const pushToken = await Notifications.getExpoPushTokenAsync();

    console.log('pushToken', pushToken.data);

    return pushToken.data;
  }
};