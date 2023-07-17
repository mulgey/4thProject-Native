import { View, Text, StyleSheet } from "react-native";

export default function List({ veri }) {
  // fazla sayıda içerik olsaydı FlatList kullanacaktık. ama map'leyip geçtik
  return veri.map((tekilVeri) => (
    // bu şekilde map'lemelerde key zorunlu, içerik unique olduğu içip onu yazıp geçtik
    // key'i outer View'a yerleştirdik
    <View style={styles.listItem} key={tekilVeri}>
      <Text style={styles.itemText}>{tekilVeri}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#F3B539",
  },
  itemText: {
    color: "#0846BB",
    textAlign: "center",
  },
});
