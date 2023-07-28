import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

// screens & components
import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import FavoritesContextSaglayici from "./store/context/favorites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CekmeceNavigasyonu() {
  return (
    <Drawer.Navigator
      screenOptions={{
        // bu kısmı devre dışı bıraktığımız "drawer" header'ından kopyaladık
        headerStyle: { backgroundColor: "#0846BB" },
        // başlık yazısı rengi
        headerTintColor: "white",
        // direkt background, aşağıda contentStyle diye geçiyordu
        sceneContainerStyle: { backgroundColor: "#415E95" },
        // yukarıdakinden farklı olarak sadece çekmece kısmına hitap ediyor
        drawerContentStyle: { backgroundColor: "#0846BB" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#0846BB",
        drawerActiveBackgroundColor: "#BEC4F5",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* app-wide management için aşağıya context-provider'ı yerleştirdik ve tüm uygulamayı sardık */}
      <FavoritesContextSaglayici>
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
              name="drawer"
              component={CekmeceNavigasyonu}
              // drawerNavigation'ı buraya yerleştirmek için aşağıdaki yerine yukarıdakini kullandık
              // component={CategoriesScreen}
              // LOCAL settings olarak düşünelim
              options={{
                // title artık gerekmiyor, false ladığımız için
                title: "All Meals",
                headerShown: false,
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
            <Stack.Screen
              name="mealDetail"
              component={MealDetailScreen}
              // aşağıdaki çalışmayacak çünkü dinamik olarak ayarlamıştık
              options={{ title: "About the Meal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextSaglayici>
    </>
  );
}

const styles = StyleSheet.create({});
