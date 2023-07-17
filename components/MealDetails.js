import { View, Text, StyleSheet } from "react-native";

// style'lar ekledik, komponentin kullanıldığı yerde dışarıdan style kabul ederiz ve buradaki array'in içinde ekleme yapabiliriz
export default function MealDetails({
  duration,
  complexity,
  affordability,
  extStyle,
  extTextStyle,
}) {
  return (
    <View style={[styles.details, extStyle]}>
      <Text style={[styles.detailItem, extTextStyle]}>{duration}</Text>
      <Text style={[styles.detailItem, extTextStyle]}>
        {complexity.toUpperCase()}
      </Text>
      <Text style={[styles.detailItem, extTextStyle]}>
        {affordability.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
