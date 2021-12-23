import withApollo from 'next-with-apollo'
import ApolloClient, {InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import moment from 'moment'

export default withApollo(
    ({initialState, headers}) => {
        return new ApolloClient({
            request: operation => {
                operation.setContext({
                    fetchOptions: {
                        credentials: 'include'
                    },
                    headers
                })
            },
            uri: process.env.BASE_URL,
            cache: new InMemoryCache().restore(initialState || {})
        })
    },
    {
        render: ({Page, props}) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            )
        }
    }
)
