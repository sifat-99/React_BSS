import React from 'react'
import EventForm from '../components/EventForm'
import { redirect } from 'react-router-dom'

const NewEventPage = () => {

    return (
        <EventForm method="post"></EventForm>
    )
}

export default NewEventPage

export async function action({ request, params }) {
    const method = request.method;
    console.log(method)
    const data = await request.formData();
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description')
    }
    let url = `${import.meta.env.VITE_BACKEND_URL}/events`
    if (method === 'PATCH') {
        url = `${import.meta.env.VITE_BACKEND_URL}/events/` + params.eventId
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
    if (response.status === 422) {
        return response
    }


    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Failed to push events' }), { status: 500 })
    }
    return redirect('/events');
}