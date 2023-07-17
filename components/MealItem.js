import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import MealDetails from "./MealDetails";

export default function MealItem({
  // Stack.Screen dosyası olmadığı için MealsOverviewScreen dosyası üzerinden gönderdiğimiz navigation'ı burada kabul ediyoruz
  navigation,
  title,
  id,
  imageURL,
  duration,
  complexity,
  affordability,
}) {
  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.iOSPressed : null)}
        onPress={() => {
          // object içerisindeki navigate fonksiyonu ile "name" olarak belirttiğimiz isme (sayfaya) yönlendirdik (1st parameter)
          // ikinci parametrede aktarmak istediğimiz verileri nesne olarak olarak sunduk
          navigation.navigate("mealDetail", {
            mealID: id,
          });
        }}
      >
        <View style={styles.innerContainer}>
          <View>
            {/* variable lar için kullanılan "uri"yi ilk defa kullandık */}
            <Image style={styles.image} source={{ uri: imageURL }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            duration={duration}
            complexity={complexity}
            affordability={affordability}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    // shadow did not work on iOS so ..
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    // android shadow
    elevation: 4,
    // iOS shadow
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  // image, text ve details'in etrafına yeni bir view atıp bu style ları ekleyince üst kısım da borderRadius'a sahip olmuş oldu
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  iOSPressed: {
    opacity: 0.5,
  },
});
