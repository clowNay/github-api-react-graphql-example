import { StrictMode } from 'react';
import { render } from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import './index.css';
import App from './App';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
    console.log(process.env)
    // get the authentication token from local storage if it exists
    const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
    // return the headers to the context so httpLink can read them
    if (!token) {
        throw new Error('REACT_APP_GITHUB_ACCESS_TOKEN is missing in .env')
    }

    return {
        headers: {
            ...headers,
            authorization: `bearer ${token}`,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>,
    document.getElementById('root')
);
