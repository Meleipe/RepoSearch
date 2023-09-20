import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { FavouritesContext } from 'context/favouritesContext';
import RepositoryCard from './RepositoryCard';

export const Favourites = () => {
  const { favouritesList } = React.useContext(FavouritesContext);

  if (favouritesList.length === 0) {
  }
  return (
    <>
      <header className="App-header">
        <Typography variant="h1">My Favourites List</Typography>
      </header>
      {favouritesList.length === 0 ? (
        <Typography variant="h5">
          <Link to="/">
            You have no favourites yet. Try adding some and the coming back to
            this page
          </Link>
        </Typography>
      ) : (
        <>
          <Typography variant="h5">
            <Link to="/">Go back to search</Link>
          </Typography>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {favouritesList.map((favourite) => (
              <RepositoryCard key={favourite.id} {...favourite} />
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default Favourites;
