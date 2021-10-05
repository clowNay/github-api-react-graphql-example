import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { User } from '../types';
import RepositoryView from './RepositoryView';
import {
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
import RespositoryList from './RepositoryList';
import { SEARCH_USERS } from '../queries';

type SelectedUser = User|any

export default function UsersView () {
    const history = useHistory()
    const [ users, setUsers ] = useState([])
    const [ query, setQuery ] = useState(history.location.pathname.split('/')[1] ?? '')
    const [ selectedUser, setSelectedUser ] = useState<SelectedUser>(null)
    const { push } = useHistory()

    const [ searchQuery, { loading } ] = useLazyQuery(SEARCH_USERS, {
        onCompleted: ({ search }) => {
            if (search.nodes.length) {
                setUsers(search.nodes)
            }
        }
    })

    const handleUserSelect = (user:User) => {
        setSelectedUser(user)
        push(`/${user.login}/repositories`)
    }

    const handleSearch = (newQuery:string) => {
        if (query !== newQuery) {
            if (newQuery === '') {
                push('/')
            }

            setQuery(newQuery)
        }
    }

    useEffect(() => {
        searchQuery({ variables: { query: `${query} sort:followers` }})
    }, [searchQuery, query])

    return (
        <div>
            <div className="py-20 w-full m-auto max-w-sm">
                <input
                    className="block w-full form-input rounded-lg bg-gray-50 border-gray-300 focus:border-gray-900 focus:bg-white focus:ring-0"
                    type="search"
                    placeholder="Search users"
                    onChange={ e => handleSearch(e.target.value)}
                    defaultValue={query}
                />
            </div>


            { !loading && !query &&
                (<p className="font-bold text-lg mb-2">Most Popular Users</p>)
            }

            <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {
                    loading
                        ? (
                            <p className="p-4 col-span-full text-center text-gray-700">
                                {
                                    !query
                                        ? 'Finding most popular users...'
                                        : `Searching for user ${query}...`
                                }
                            </p>
                        )
                        : users.length && users.map((user:any, index) => (
                            <div
                                onClick={() => handleUserSelect(user)}
                                key={user.login}
                                tabIndex={index}
                                className={`${selectedUser?.login === user.login ? 'border-gray-900' : ''} h-40 p-4 border transition-all appearance-none rounded-lg bg-white shadow-sm  flex flex-col items-center justify-center hover:shadow-xl hover:cursor-pointer group`}
                            >
                                <img className="w-20 h-20 rounded-full transform transition-all group-hover:scale-110" src={user.avatarUrl} alt={user.name} />
                                <p className="mt-4 text-sm uppercase font-bold">{user.name}</p>
                            </div>
                        ))
                }
            </div>

            <div className="bg-white rounded-lg shadow-sm my-4">
                <Switch>
                    <Route path="/:userId/repositories" exact component={RespositoryList} />
                    <Route path="/:userId/repositories/:repositoryId" component={RepositoryView} />
                </Switch>
            </div>
        </div>
    )
}
