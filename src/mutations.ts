import { gql } from '@apollo/client';

const CREATE_ISSUE_ON_REPOSITORY = gql`
    mutation createIssueOnRepository($repositoryId: ID!, $title: String!, $body: String) {
        createIssue(input: { repositoryId: $repositoryId, title: $title, body: $body }) {
            issue {
                id
                title
                body
                author {
                    avatarUrl(size: 64)
                    login
                }
            }
        }
    }
`;

export {
    CREATE_ISSUE_ON_REPOSITORY
}
