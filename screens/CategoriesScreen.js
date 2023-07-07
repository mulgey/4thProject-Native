import { FlatList } from "react-native";

// data load
import { CATEGORIES } from "../data/dummy-data";

// components
import CategoryGridTile from "../components/CategoryGridTile";

// react navigation'a ait olan navigation object'ini kullandık
export default function CategoriesScreens({ navigation }) {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={(herbirÖge) => {
        return (
          <CategoryGridTile
            title={herbirÖge.item.title}
            color={herbirÖge.item.color}
            // eğer onPress yapısını "() => {}" şeklinde yapmazsak sürekli tetikleyerek problem oluşturuyordu
            onPress={() => {
              // object içerisindeki navigate fonksiyonu ile "name" olarak belirttiğimiz isme (sayfaya) yönlendirdik (1st parameter)
              // ikinci parametrede aktarmak istediğimiz verileri nesne olarak olarak sunduk
              navigation.navigate("Meal Overview", {
                kategoriID: herbirÖge.item.id,
              });
            }}
          />
        );
      }}
      numColumns={2}
    ></FlatList>
  );
}
