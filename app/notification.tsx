import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onValue, ref } from "firebase/database";

import { database } from "@/constants/firebase";
import UtilsStyles from "../constants/utlis";
import Colors from "../constants/Colors";

const Notification = () => {
  const colorSchema = useColorScheme();
  const themeColor = Colors[colorSchema ?? "light"];

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const dashboardRef = ref(database, "/");

    const unsubscribe = onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.alertMessage?.length > 0) {
        setMessage(data.alertMessage);
      } else {
        setMessage(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <Text style={[styles.header, { color: themeColor.text }]}>
        Notifications
      </Text>

      {message && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>{message}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  alertBox: {
    backgroundColor: "#FF4C4C", // Red alert
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  alertText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Notification;
