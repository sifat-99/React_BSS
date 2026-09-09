import React from 'react'

const PageWithId = ({ params }) => {
    return (
        <div>
            <h1>PageWithId {params.id}</h1>
        </div>
    )
}

export default PageWithId