import { createContext, useState } from "react";

// büyük harf zorunlu (component stuff)
// auto-comp için zorunlu olmasa da başlangıç için bir değer sağladık
// diğer sayfalar içerisinde bu const u çağıracağız useContext için
export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextSaglayici({ children }) {
  const [favIDs, favIDAksiyonu] = useState([]);

  function addFavorite(id) {
    // based on the prev state snapshot, returning a new array
    favIDAksiyonu((mevcutFavlar) => [...mevcutFavlar, id]);
  }

  function removeFavorite(id) {
    // based on the prev state snapshot, filtering out the id
    favIDAksiyonu((mevcutFavlar) =>
      mevcutFavlar.filter((yemekIDsi) => yemekIDsi !== id)
    );
  }

  // aşağıda bunu context.provider içerisinde yollayacağız
  const degerler = {
    // yukarıda tercih ettiğimiz isimleri kullanıyoruz
    ids: favIDs,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    // value içersindeki değerlerin hepsi, wrapped components ler için kullanılabilir
    <FavoritesContext.Provider value={degerler}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextSaglayici;
