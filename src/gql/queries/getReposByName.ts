import { gql } from '@apollo/client';

const GET_REPOS_BY_NAME = gql`
  query GetReposByName($term: String!, $after: String) {
    search(query: $term, type: REPOSITORY, first: 10, after: $after) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      repositoryCount
    }
  }
`;

export default GET_REPOS_BY_NAME;
