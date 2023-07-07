import { View, StyleSheet, FlatList, Text } from "react-native";

// import data
import { MEALS } from "../data/dummy-data";

// components
import MealItem from "../components/MealItem";

// app.js'de Stack.Screen olarak kayıtlı olduğu için react navigation'a ait olan route object'ini kullanabildik
// categoriesScreen dosyasında "navigation.navigate()" ile yönlendirirken 2.parametre olarak içine yerleştirdiğimiz verileri route ile burada kullandık
export default function MealsOverview({ route }) {
  const kategID = route.params.kategoriID;

  const görüntülenecekYemekler = MEALS.filter((yemekÖğesi) => {
    // her öğenin "categoryIds"sine bakıp "kategID"nin olup olmadığına bakıyoruz
    // "categoryIds" dummy-data için meals models'inde önceden yapılandırılmış olan isim
    return yemekÖğesi.categoryIds.indexOf(kategID) >= 0;
  });

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
            title: veri.title,
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
