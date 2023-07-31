import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

// row-data
import { MEALS } from "../data/dummy-data";

// components & contexts
import MealList from "../components/MealList/MealList";
import { FavoritesContext } from "../store/context/favorites-context";

export default function FavouritesScreen({ navigation }) {
  // context'imiz için ön yükleme yaptık
  const favsContext = useContext(FavoritesContext);

  // şimdi favorilerimizi row-data üzerinden tarayarak alıyoruz
  // MEALS içerisindeki her bir "tekilYemek"in "id"si, context'imiz içerisindeki id'ler array'i içerisinde yer alıyor mu
  // true olanların içinde olduğu bir array oluşacaktır filter sonucunda
  const favoriler = MEALS.filter((tekilYemek) =>
    favsContext.ids.includes(tekilYemek.id)
  );

  if (favoriler.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>
          Favori bir yemeğiniz henüz yok. Eklemek isterseniz tarif ekranındaki
          yıldızı kullanabilirsiniz
        </Text>
      </View>
    );
  }

  return (
    <MealList görüntülenecekYemekler={favoriler} navigation={navigation} />
  );
}

const styles = StyleSheet.create({
  rootContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
