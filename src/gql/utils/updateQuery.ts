import { RepositorySearchResultType } from '../types/repositories';

function updateQuery(
  previousQueryResult: RepositorySearchResultType,
  { fetchMoreResult }: { fetchMoreResult: RepositorySearchResultType }
) {
  fetchMoreResult.search.edges = [
    ...previousQueryResult.search.edges,
    ...fetchMoreResult.search.edges
  ];
  return fetchMoreResult;
}

export default updateQuery;
