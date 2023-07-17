import { View, StyleSheet, FlatList } from "react-native";
import { useLayoutEffect } from "react";

// import data
import { MEALS, CATEGORIES } from "../data/dummy-data";

// components
import MealItem from "../components/MealItem";

// app.js'de Stack.Screen olarak kayıtlı olduğu için react navigation'a ait olan route object'ini kullanabildik
// categoriesScreen dosyasında "navigation.navigate()" ile yönlendirirken 2.parametre olarak içine yerleştirdiğimiz verileri route ile burada kullandık
export default function MealsOverviewScreen({ route, navigation }) {
  const kategID = route.params.kategoriID;

  const görüntülenecekYemekler = MEALS.filter((yemekÖğesi) => {
    // her öğenin "categoryIds"sine bakıp "kategID"nin olup olmadığına bakıyoruz
    // "categoryIds" dummy-data için meals models'inde önceden yapılandırılmış olan isim
    // includes() da kullanabilirdik
    return yemekÖğesi.categoryIds.indexOf(kategID) >= 0;
  });

  // useLayoutEffect'i animasyon sıraya göre olsun, sayfa yüklendikten sonra başlık değişmesin diye tercih ettik
  useLayoutEffect(() => {
    // dummy-data'dan "CATEGORIES"i çektik
    // her birinin "id"sini, "CategoriesScreen" dosyasında FlatList "CATEGORIES" data'sında looplayıp aldığımız ID ile karşılaştırdık
    // return koyuncaya kadar veriyi çekemiyorduk, chatGPT sağolsun
    const kategoriTitle = CATEGORIES.find((kategori) => {
      return kategori.id === kategID;
    }).title;

    navigation.setOptions({ title: kategoriTitle });
    // external öğeleri dependency yaptık: kategID ve navigation
    // CATEGORIES da external fakat import ettiğimiz için değişken değil
  }, [kategID, navigation]);

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
