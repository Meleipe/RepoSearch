import { ReactNode } from 'react';

export type FavouriteType = {
  id: string;
  name: string;
  description: string;
  rate: number;
};

export type AddToFavouritesArgsType = {
  id: string;
  name: string;
  description: string;
};

export type RemoveFromFavouritesArgsType = {
  id: string;
};

export type RateFavouriteArgsType = {
  id: string;
  rate: number;
};

export type FavouritesContextProviderPropsType = {
  children: ReactNode;
};

export type ContextPropsType = {
  favouritesList: FavouriteType[];
  addToFavourites: Function;
  removeFromFavourites: Function;
  rateFavourite: Function;
};
