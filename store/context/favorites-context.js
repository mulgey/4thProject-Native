import { createContext } from "react";

// büyük harf zorunlu (component stuff)
// auto-comp için zorunlu olmasa da başlangıç için bir değer sağladık
export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextSaglayici({ children }) {
  return <FavoritesContext.Provider>{children}</FavoritesContext.Provider>;
}

export default FavoritesContextSaglayici;
