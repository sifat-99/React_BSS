import React from 'react'
import { useRouteLoaderData, redirect } from 'react-router-dom'
import EventItem from '../components/EventItem';

const EventDetailsPage = () => {
    const event = useRouteLoaderData('event-detail')
    return (
        <EventItem event={event}></EventItem>
    )
}

export default EventDetailsPage


export async function loader({ request, params }) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/` + params.eventId);
    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Failed to fetch events' }), { status: 500 })
    } else {
        const resData = await response.json();
        console.log(resData)
        return resData.event;
    }
}


export async function action({ request, params }) {
    const eventId = params.eventId
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/` + eventId, {
        method: request.method,
    })
    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Failed to delete event' }), { status: 500 })
    }
    return redirect('/events')
}