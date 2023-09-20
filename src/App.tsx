import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './components/Search';
import Favourites from './components/Favourites';
import FavouritesContextProvider from './context/favouritesContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />
  },
  {
    path: '/favs',
    element: <Favourites />
  }
]);

function App() {
  return (
    <FavouritesContextProvider>
      <RouterProvider router={router} />
    </FavouritesContextProvider>
  );
}

export default App;
