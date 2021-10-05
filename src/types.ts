export interface Comment {
    id: string
    author: User
}

export interface Issue {
    id: string
    state: string
    title: string
    titleHTML: string
    bodyHTML: string
    author: User
    comments: {
        nodes: [Comment]
        totalCount: number
    }
}

export interface Repository {
    id: string,
    name: string,
    stargazerCount: number,
    issues: {
        nodes: [Issue]
    }
}

export interface User {
    id: string
    login: string
    name: string
    avatarUrl: string
    repositories: {
        nodes: [Repository]
    }
}
