import { View, StyleSheet, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import Skleton from "./Skeleton";
import UtilsStyles from "@/constants/utlis";

const MainCardLoader = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <>
      <View
        style={[
          style.card,
          {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            borderColor:
              colorScheme == "dark" ? "rgba(255,255,255,0.6)" : "transparent",
            borderWidth: colorScheme == "dark" ? 0.2 : 0,
          },
        ]}
      >
        <View
          style={[
            UtilsStyles.flex,
            UtilsStyles.alignItemsCenter,
            UtilsStyles.justifyContentSapceBetween,
          ]}
        >
          <Skleton width={"80%"} height={30} />
          <Skleton width={30} height={30} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Skleton width={"100%"} height={30} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Skleton width={"100%"} height={30} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Skleton width={"100%"} height={30} />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // For Android
  },
});

export default MainCardLoader;
