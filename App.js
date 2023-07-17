import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

// screens & components
import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          // GLOBAL settings olarak düşünelim
          screenOptions={{
            headerStyle: { backgroundColor: "#0846BB" },
            // başlık yazısı rengi
            headerTintColor: "white",
            // direkt background
            contentStyle: { backgroundColor: "#415E95" },
          }}
        >
          <Stack.Screen
            name="mealCategories"
            component={CategoriesScreen}
            // LOCAL settings olarak düşünelim
            options={{
              title: "All Meals",
            }}
          />
          <Stack.Screen
            name="mealOverview"
            component={MealsOverviewScreen}
            // DYNAMIC settings olarak düşünelim
            // lakin düzenlemeyi burada değil, MealsOverviewScreen dosyası içerisinde yaptık
            /*
            options={(route, navigation) => {
              // burada problem var, geçiştirmek için params? yaptım
              const kategID = route.params?.kategoriID || "";
              return {
                title: kategID,
              };
            }}
            */
          />
          {/* MealDetailScreen için hazırlayacağımız Button'ın onPress fonksiyonu direkt buradan, app.js içerisinden çalışmaz
          interaction gerekiyorsa burada değil, komponent içerisinde tanımlamalıyız */}
          <Stack.Screen name="mealDetail" component={MealDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
