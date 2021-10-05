import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { GET_USER } from '../queries';
import { Repository } from '../types';

interface RepositoryListRouteParams {
    userId: string
}

export default function RespositoryList () {
    const { userId } = useParams<RepositoryListRouteParams>()
    const { push } = useHistory()
    const [getUser, { data, loading }] = useLazyQuery(GET_USER)

    useEffect(() => {
        getUser({ variables: { userId } })
    }, [getUser, userId])

    if (loading || !data) return <p className="p-4 text-center text-gray-700">Getting repositories...</p>

    return (
        <div className="p-4">
            <div className="bg-gray-50 -m-4 p-4 rounded-t-lg overflow-hidden flex justify-between">
                <p className="font-bold text-lg">{`${data.user.name} repositories`}</p>
            </div>

            <div className="mt-4 grid grid-flow-row gap-4">
                { data.user.repositories.nodes.map((repo:Repository) => (
                    <div
                        onClick={() => push(`/${data.user.login}/repositories/${repo.name}`)}
                        key={repo.id}
                        className="bg-white border-b border-gray-300 h-15 flex items-center justify-between p-4 transform transition-all hover:cursor-pointer hover:shadow-xl"
                    >
                        <span>{repo.name}</span>
                        <span>&#9733;{repo.stargazerCount}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
