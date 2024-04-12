import ReactDOM from 'react-dom/client'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from './pages/Layout.tsx';
import { HomePage } from './pages/Home.tsx';
import { FeaturePage } from './pages/Feature.tsx';

import './index.css'

// Font
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:id",
        element: <FeaturePage />,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
