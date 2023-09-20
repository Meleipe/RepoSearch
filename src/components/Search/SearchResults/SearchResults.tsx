import React from 'react';
import { Stack } from '@mui/material';
import { RepositoryEdgesType } from 'gql/types/repositories';
import { FavouritesContext } from 'context/favouritesContext';
import { RepositoryEdgeType } from 'gql/types/repositories';
import RepositoryCard from './RepositoryCard';

type SearchResultsPropsType = {
  results: RepositoryEdgesType;
};

const SearchResults = ({ results }: SearchResultsPropsType) => {
  const { favouritesList } = React.useContext(FavouritesContext);
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      m={'30px 0px'}
      direction="row"
      useFlexGap
      flexWrap="wrap"
    >
      {results.length > 0 &&
        results.map(({ node }: RepositoryEdgeType) => {
          const elementIsFavourite = favouritesList.some(
            ({ id: currentId }) => currentId === node.id
          );
          return (
            <RepositoryCard
              key={node.id}
              {...node}
              elementIsFavourite={elementIsFavourite}
            />
          );
        })}
    </Stack>
  );
};

export default SearchResults;
