import React from 'react'
import { useParams } from 'react-router-dom'

const EventDetailsPage = () => {
    const params = useParams();
    return (
        <div>EventDetailsPage - {params.eventId}</div>
    )
}

export default EventDetailsPage