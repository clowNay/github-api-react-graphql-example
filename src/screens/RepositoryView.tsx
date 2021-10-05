import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CreateIssueDialog from '../components/CreateIssueDialog';
import { GET_REPOSITORY } from '../queries';
import { Issue } from '../types';

interface RepositoryViewParams {
    repositoryId: string
    userId: string
}

export default function RepositoryView () {
    const { repositoryId, userId } = useParams<RepositoryViewParams>()
    const [ getRepository, { loading, data } ] = useLazyQuery(GET_REPOSITORY);
    const [ issueModalVisible, setIssueModalVisible ] = useState(false)

    useEffect(() => {
        getRepository({ variables: { repositoryId, userId } })
    }, [getRepository, repositoryId, userId])

    if (loading || !data) return <p className="p-4 text-center text-gray-700">Reading repository...</p>

    return (
        <div className="p-4">
            <div className="bg-gray-50 -m-4 p-4 rounded-t-lg overflow-hidden flex justify-between">
                <span className="font-bold text-lg">{data.repository.name}</span>
                <span>&#9733;{data.repository.stargazerCount}</span>
            </div>

            <div className="text-right">
                <button
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={ () => setIssueModalVisible(!issueModalVisible) }
                >
                    + Create New Issue
                </button>
                <CreateIssueDialog
                    onIssueCreated={ () => getRepository({ variables: { repositoryId, userId } }) }
                    onClose={ () => setIssueModalVisible(false) }
                    repository={data.repository}
                    visible={issueModalVisible}
                />
            </div>

            { data.repository.issues.nodes.length
                ? (
                    <div className="rounded-t-sm overflow-hidden grid grid-flow-row gap-4">
                        {data.repository.issues.nodes.map((issue:Issue) => (
                            <div key={issue.id} className="border-b border-gray-300 h-20 flex flex-col justify-center p-4 transform transition-all hover:cursor-pointer hover:shadow-xl">
                                <p className="mb-2 text-sm font-bold" dangerouslySetInnerHTML={{ __html: issue.titleHTML }}></p>

                                <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <img className="h-4 w-4 rounded-full" src={issue.author.avatarUrl} alt={issue.author.login} />
                                        <span className="ml-2 text-sm">{issue.author.login}</span>
                                    </div>

                                    <p className="text-sm text-gray-400">
                                        {issue.comments.totalCount} comments
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                : <p className="text-center text-gray-700">Repository does not have any issues</p>
            }
        </div>
    )
}
