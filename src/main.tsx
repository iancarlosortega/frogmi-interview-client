import ReactDOM from 'react-dom/client'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from './pages/Layout.tsx';
import { HomePage } from './pages/Home.tsx';
import { FeaturePage } from './pages/Feature.tsx';

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css'

// Font
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';

// Mapbox config

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

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
