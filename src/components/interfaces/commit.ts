export interface ICommit {
    sha: string;
    commit: {
        author: {
            name: string;
            email: string;
            date: Date|string;
        },
        committer: {
            name: string;
            email: string;
            date: Date|string;
        },
        message: string,
        tree: {
            sha: string;
            url: string;
        },
        url: string,
        comment_count: 0,
        verification: {
            verified: false,
            reason: string;
            signature?: string;
            payload?: string;
        }
    },
    url: string,
    html_url: string;
    comments_url: string;
    author: {
        login: string;
        id: number;
        avatar_url: string;
        gravatar_url: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    },
    committer: {
        login: string;
        id: number;
        avatar_url: string;
        gravatar_url: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    },
    parents: {
        sha: string;
        url: string;
        html_url: string;
    }[]
}
