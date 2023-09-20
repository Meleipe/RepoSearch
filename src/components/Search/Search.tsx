import React from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';
import styles from './Search.module.scss';
import GET_REPOS_BY_NAME from 'gql/queries/getReposByName';
import { RepositorySearchResultType } from 'gql/types/repositories';
import useDebounce from 'hooks/useDebounce';
import { Typography } from '@mui/material';

type LazyQueryType = [
  Function,
  {
    data?: RepositorySearchResultType;
    loading: boolean;
    error?: ApolloError;
    fetchMore: Function;
  }
];

export const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [results, setResults] = React.useState<Array<any>>([]);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [getRepos, { data, loading, error, fetchMore }]: LazyQueryType =
    useLazyQuery(GET_REPOS_BY_NAME, {
      variables: {
        term: debouncedSearchTerm,
        first: 20
      }
    });

  React.useEffect(() => {
    if (data && data.search?.edges?.length > 0) {
      setResults([...data.search.edges]);
    }
  }, [data]);

  React.useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      getRepos();
    }
  }, [debouncedSearchTerm, getRepos]);

  const onShowMoreClick = () => {
    setIsLoadingMore(true);
    fetchMore({
      variables: { after: data && data.search.pageInfo.endCursor },
      updateQuery(
        previousQueryResult: RepositorySearchResultType,
        { fetchMoreResult }: { fetchMoreResult: RepositorySearchResultType }
      ) {
        setIsLoadingMore(false);
        fetchMoreResult.search.edges = [
          ...previousQueryResult.search.edges,
          ...fetchMoreResult.search.edges
        ];
        return fetchMoreResult;
      }
    });
  };

  if (error) {
    return (
      <>
        <div>{error.name}</div>
        <div>{error.message}</div>
      </>
    );
  }

  return (
    <div className={styles.App}>
      <header>
        <Typography variant="h1">Search GitHub Repositories</Typography>
      </header>
      <Typography variant="h5">
        <Link to="/favs">Check My Favourites</Link>
      </Typography>
      <TextField
        fullWidth
        value={searchTerm}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(evt.target.value);
        }}
      />
      {loading && <CircularProgress className={styles.customLoading} />}
      {results.length > 0 && searchTerm.length >= 3 && (
        <>
          {!loading && <SearchResults results={results} />}
          <div className={styles.showMore}>
            <Button
              variant="outlined"
              disabled={!data?.search?.pageInfo?.hasNextPage || isLoadingMore}
              onClick={onShowMoreClick}
            >
              {isLoadingMore ? <CircularProgress size={20} /> : 'Show More'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
