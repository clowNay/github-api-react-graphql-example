/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useMutation } from '@apollo/client';
import { CREATE_ISSUE_ON_REPOSITORY } from '../mutations';

interface CreateIssueDialogProps {
    repository: any
    visible?: boolean
    onIssueCreated: () => void
    onClose?: () => void
}

export default function CreateIssueDialog({ repository, visible = false, onClose = () => {}, onIssueCreated = () => {} }:CreateIssueDialogProps) {
    const [open, setOpen] = useState(visible)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const cancelButtonRef = useRef(null)
    const [ createIssue ] = useMutation(CREATE_ISSUE_ON_REPOSITORY, {
        variables:  {
            repositoryId: repository.id,
            title,
            body
        },
        onCompleted: () => {
            onIssueCreated()
        }
    })

    const handleClose = () => {
        setOpen(false)
        onClose()
    }

    useEffect(() => {
        setOpen(visible)
    }, [visible])

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Create New Issue
                                    </Dialog.Title>

                                    <div className="mt-2">
                                        <p className="text-sm mb-4 text-gray-500">
                                            You're about to create a new issue on <b>{repository.name}</b>. Before you submit it, make sure you follow the guidelines for creating new issues on this repository.
                                        </p>

                                        <input
                                            type="text"
                                            placeholder="Title"
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="block mb-4 w-full form-input rounded-lg bg-gray-50 border-gray-300 focus:border-gray-900 focus:bg-white focus:ring-0"
                                        />

                                        <textarea
                                            placeholder="Description"
                                            onChange={(e) => setBody(e.target.value)}
                                            className="block w-full form-input rounded-lg bg-gray-50 border-gray-300 focus:border-gray-900 focus:bg-white focus:ring-0"
                                        />
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => createIssue()}
                                >
                                    Create
                                </button>

                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => { handleClose() }}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>

                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
