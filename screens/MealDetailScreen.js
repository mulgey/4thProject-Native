import { useContext, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import { MEALS } from "../data/dummy-data";

// components & contexts
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetail/SubTitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

// Stack.Screen grubunda olduğu için "route"u direkt olarak kullanabildik
export default function MealDetailScreen({ route, navigation }) {
  const favsContext = useContext(FavoritesContext);

  // MealItem dosyası içerisinde navigate object'i içerisinde gönderdiğimiz data nesnesinden title'ı çektik
  const mealID = route.params.mealID;

  // unique ID'yi aldıktan sonra data içerisindeki MEALS grubunda ID üzerinden hangi tarif olduğunu bulabiliriz
  // böylece tüm verileri tek tek MealItem dosyası üzerinden aktarmaya gerek kalmadı
  const secilmisMeal = MEALS.find((yemek) => yemek.id === mealID);

  // öncelikle önceden eklenmiş bir öğe mi onu kontrol edelim
  const buMealFavoriMi = favsContext.ids.includes(mealID);

  function starDegisimFonksiyonu() {
    // favori olup olmamasına göre farklı aksiyonlar
    if (buMealFavoriMi) {
      favsContext.removeFavorite(mealID);
    } else {
      favsContext.addFavorite(mealID);
    }
  }

  // useLayoutEffect sayesinde sırayla gerçekleştirip komponent yüklenmesinde hata oluşmasını engelledik
  useLayoutEffect(() => {
    navigation.setOptions({
      title: secilmisMeal.title,
      // başlığın sağında gözükecek elementi komponent olarak buraya yazabiliriz
      headerRight: () => {
        return (
          <IconButton
            onPress={starDegisimFonksiyonu}
            // yıldız, favori olup olmamasına göre dinamik değişkenlik gösterecektir
            icon={buMealFavoriMi ? "star" : "star-outline"}
            iconColor={"white"}
          />
        );
      },
    });
  }, [secilmisMeal, navigation, starDegisimFonksiyonu]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: secilmisMeal.imageUrl }} />
        <Text style={styles.title}>{secilmisMeal.title}</Text>
        <MealDetails
          duration={secilmisMeal.duration}
          affordability={secilmisMeal.affordability}
          complexity={secilmisMeal.complexity}
          // MealItem dosyası içerisinde kabul edilecek şekilde prop hazırlamıştık7
          extTextStyle={styles.detailText}
        />
        {/* 1.view = içeriği ortalamak için // 2.view = genişliği sınırlandırmak için */}
        <View style={styles.listOuterContainer}>
          <View style={styles.listContainer}>
            <SubTitle>Ingredients</SubTitle>
            {/* fazla sayıda içerik olsaydı FlatList kullanacaktık. ama map'leyip geçtik */}
            <List veri={secilmisMeal.ingredients} />
            <SubTitle>Steps</SubTitle>
            <List veri={secilmisMeal.steps} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 40,
  },
  image: {
    height: 350,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    maxWidth: "90%",
  },
});
