// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventPage";
import EventDetailPage from "./pages/EventDetailsPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./layout/Rootlayout";
import EventsRootLayout from "./layout/EventsRootLayout";
import ErrorPage from "./pages/Error";
import { loader as eventLoader, action as deleteEventAction } from "./pages/EventDetailsPage";
import { action as manipulateEventAction } from "./pages/NewEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { path: '/', element: <HomePage /> },
      // { path: '/events', element: <EventsPage /> },
      // { path: '/events/:eventId', element: <EventDetailPage /> },
      // { path: '/events/new', element: <NewEventPage /> },
      // { path: '/events/:eventId/edit', element: <EditEventPage /> }
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true, element: <EventsPage />, loader: async () => {
              const response = await fetch('http://localhost:8080/events');
              if (!response.ok) {
                throw new Response(JSON.stringify({ message: 'Failed to fetch events' }), { status: 500 })
                // return json()
              } else {
                const resData = await response.json();
                return resData.events;
              }
            }
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventLoader,
            children: [
              { index: true, element: <EventDetailPage />, action: deleteEventAction },
              { path: 'edit', element: <EditEventPage />, action: manipulateEventAction }
            ]
          },
          { path: 'new', element: <NewEventPage />, action: manipulateEventAction },
        ]
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router}>

  </RouterProvider>
}

export default App;
