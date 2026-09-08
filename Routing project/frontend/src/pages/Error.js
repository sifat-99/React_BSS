import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError()
    if (error.status === 500) {
        return <main>
            <h1>Could not find data!!</h1>
            <p>{JSON.parse(error.data).message}</p>
        </main>
    }
    if (error.status === 404) {
        return <main>
            <h1>Not found</h1>
            <p>Could not Find the desire destination!!!</p>
        </main>
    }
    return (
        <main>
            <h1>Something went wrong</h1>
            <p>Error is not defined</p>
        </main>
    )
}

export default ErrorPage    