import { useLoaderData, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
    const events = useLoaderData();
    return <>
        <Suspense fallback={<p>Loading events...</p>}>
            <Await resolve={events}>
                {
                    (loadedEvents) => <EventsList events={loadedEvents} />
                }
            </Await>
        </Suspense>
    </>
}

export async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Failed to fetch events' }), { status: 500 })
        // return json()
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export default EventsPage;


export function loader() {
    return {
        events: loadEvents(),
    };
}
