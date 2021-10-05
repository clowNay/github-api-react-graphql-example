import { gql } from '@apollo/client';

const SEARCH_USERS = gql`
    query searchQuery($query: String!) {
        search(query: $query, type: USER, first: 10) {
            nodes {
                ... on User {
                    id
                    login
                    name
                    avatarUrl
                    repositories(first: 10, orderBy: { field: STARGAZERS, direction: DESC }) {
                        nodes {
                            id
                            name
                            stargazerCount,
                            issues(first: 10, states: [OPEN], orderBy: { field: CREATED_AT, direction: DESC }) {
                                nodes {
                                    id
                                    state
                                    titleHTML
                                    bodyHTML
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const GET_USER = gql`
    query getUserWithRepositories($userId: String!) {
        user(login: $userId) {
            id
            name
            login
            avatarUrl(size: 160)
            repositories(first: 100, ownerAffiliations: [OWNER] orderBy: { field: STARGAZERS, direction: DESC }, isFork: false, privacy: PUBLIC) {
                nodes {
                    id
                    name
                    stargazerCount
                }
            }
        }
    }
`;

const GET_REPOSITORY = gql`
    query getRepositoryWithIssues($repositoryId: String!, $userId: String!) {
        repository(name: $repositoryId, owner: $userId) {
            id
            name
            stargazerCount,
            issues(first: 10, states: [OPEN], orderBy: { field: CREATED_AT, direction: DESC }) {
                nodes {
                    id
                    state
                    titleHTML
                    bodyHTML
                    author {
                        avatarUrl(size: 64)
                        login
                    }
                    comments(first: 10) {
                        totalCount
                        nodes {
                            id
                            author {
                                avatarUrl(size: 64)
                                login
                            }
                        }
                    }
                }
            }
        }
    }
`;

export {
    SEARCH_USERS,
    GET_USER,
    GET_REPOSITORY
}
