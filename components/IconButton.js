import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// MealDetailScreen'den headerButtonFonksiyonu'nu onPress olarak burada kabul ettik
export default function IconButton({ icon, onPress, iconColor }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={icon} size={24} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
