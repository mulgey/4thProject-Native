import { Platform, StyleSheet, Text } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
// eğer screen haricinde screen'e bağlı detay component'lerde kullanmak istersek
// import { useNavigation } from "@react-navigation/native";

export default function CategoryGridTile({ title, color, onPress }) {
  // screen harici komponentlerde navigation'ı kullanmak istersek
  // const navigation = useNavigation();

  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        // below a good example of combined conditional styling
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.iOSPressed : null,
        ]}
        onPress={onPress}
      >
        {/* basic innerContainer üstüne color temelli background color ekleyelim */}
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    // keep ripple effect inside the borders (android only)
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    // android shadow
    elevation: 4,
    // iOS shadow
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // background color is mandatory for iOS shadow
    backgroundColor: "white",
  },
  // without this, there were no content inside
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    // also added here cuz on iOS we lost the rounded corners
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  iOSPressed: {
    opacity: 0.5,
  },
});
