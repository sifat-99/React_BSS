import React from 'react'

const PageWithId = ({ params }) => {
    return (
        <main>
            <header>
                <h1>{params.id}</h1>
            </header>
        </main>
    )
}

export default PageWithId