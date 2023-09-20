import React from 'react';
import {
  FavouriteType,
  AddToFavouritesArgsType,
  FavouritesContextProviderPropsType,
  ContextPropsType
} from './types';

import { setLocalStorageItem, getLocalStorageItem } from 'utils/localStorage';
import { LS_FAVOURITES } from 'constants/localStorage';

export const FavouritesContext = React.createContext<ContextPropsType>({
  favouritesList: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  rateFavourite: () => {}
});

const FavouritesContextProvider: React.FC<
  FavouritesContextProviderPropsType
> = ({ children }) => {
  const [favouritesList, setFavouritesList] = React.useState<FavouriteType[]>(
    []
  );

  React.useEffect(() => {
    setFavouritesList(getLocalStorageItem(LS_FAVOURITES));
  }, []);

  const addToFavourites = React.useCallback(
    ({ id, name, description }: AddToFavouritesArgsType) => {
      setFavouritesList((prevFavs) => {
        const newFavList = [...prevFavs, { id, name, description, rate: 1 }];
        setLocalStorageItem(LS_FAVOURITES, newFavList);
        return newFavList;
      });
    },
    [setFavouritesList]
  );

  const removeFromFavourites = React.useCallback(
    (id: string) => {
      setFavouritesList((prevFavs) => {
        const newFavList = prevFavs.filter(({ id: favId }) => favId !== id);
        setLocalStorageItem(LS_FAVOURITES, newFavList);
        return newFavList;
      });
    },
    [setFavouritesList]
  );

  const rateFavourite = React.useCallback(
    (id: string, rate: number) => {
      setFavouritesList((prevFavs) => {
        const newFavList = prevFavs.map((favourite) =>
          favourite.id !== id
            ? favourite
            : {
                id: favourite.id,
                name: favourite.name,
                description: favourite.description,
                rate
              }
        );

        setLocalStorageItem(LS_FAVOURITES, newFavList);
        return newFavList;
      });
    },
    [setFavouritesList]
  );

  return (
    <FavouritesContext.Provider
      value={{
        favouritesList,
        addToFavourites,
        removeFromFavourites,
        rateFavourite
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
