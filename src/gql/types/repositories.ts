import { PageInfo, Repository } from './githubAPI';

export type RepositoryEdgeType = {
  node: Pick<Repository, 'id' | 'name' | 'description'>;
};

export type RepositoryEdgesType = RepositoryEdgeType[];

export type RepositorySearchResultType = {
  search: {
    edges: RepositoryEdgesType;
    pageInfo: Pick<PageInfo, 'endCursor' | 'hasNextPage'>;
  };
};
