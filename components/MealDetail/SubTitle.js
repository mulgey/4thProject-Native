import { View, Text, StyleSheet } from "react-native";

export default function SubTitle({ children }) {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: "#DCA22E",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subContainer: {
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 10,
    borderBottomColor: "#DCA22E",
    borderBottomWidth: 2,
  },
});
