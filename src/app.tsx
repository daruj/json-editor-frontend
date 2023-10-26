import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './error-page'
import Edit from './routes/edit'
import Preview from './routes/preview'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Preview />,
      },
      {
        path: 'edit',
        element: <Edit />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
