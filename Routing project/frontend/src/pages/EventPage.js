
import { Link } from 'react-router-dom'
const DUMMY_EVENTS = [
    { id: 'e1', title: 'A first Event' },
    { id: 'e2', title: 'A second Event' },
    { id: 'e3', title: 'A third Event' },
    { id: 'e4', title: 'A fourth Event' },
    { id: 'e5', title: 'A fifth Event' },
]

function EventPage() {
    return (
        <ul>
            {DUMMY_EVENTS.map((event) => (
                <li key={event.id}>
                    <Link to={`/events/${event.id}`}>
                        {event.title}
                    </Link>
                </li>
            ))}
        </ul>);
}

export default EventPage;