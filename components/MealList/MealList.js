import { View, StyleSheet, FlatList } from "react-native";

// components
import MealItem from "./MealItem";

export default function MealList({ görüntülenecekYemekler, navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        // üstte filtrelediğimiz veriyi kullandık
        data={görüntülenecekYemekler}
        // id için referansımız dummy-data ve models (meal.js)
        keyExtractor={(item) => item.id}
        renderItem={(herbirÖğe) => {
          // loop esnasında sıradaki öğenin bilgilerini "veri" konst'una yüklüyoruz
          const veri = herbirÖğe.item;
          // yeni bir object oluşturup veri içerisindeki başlıklara ait bilgileri yüklüyoruz
          const yemekÖğesiÖzellikleri = {
            // gidecek dosya Stack.Screen olmadığı için navigation object'i burada pakete ekleyip gönderdik
            navigation: navigation,
            title: veri.title,
            id: veri.id,
            imageURL: veri.imageUrl,
            affordability: veri.affordability,
            complexity: veri.complexity,
            duration: veri.duration + "m",
          };

          // distribute all the properties
          return <MealItem {...yemekÖğesiÖzellikleri} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
