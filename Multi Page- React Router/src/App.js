import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './components/Homepage';

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/about', element: <div>About</div> },
  { path: '/contact', element: <div>Contact</div> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
