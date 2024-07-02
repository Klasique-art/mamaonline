import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";

// custom imports
import './index.css';
import './App.css';

const LazyHomePage = React.lazy(() => import('./App'));
const LazyAuthPage = React.lazy(() => import('./pages/AuthPage'));
const LazyTestimonialsPage = React.lazy(() => import('./pages/TestimonialsPage'));
const LazyServicesPage = React.lazy(() => import('./pages/ServicesPage'));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback="Loading page">
        <LazyHomePage />
      </React.Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <React.Suspense fallback="Loading page">
        <LazyAuthPage />
      </React.Suspense>
    ),
  },
  {
    path: "/testimonials",
    element: (
      <React.Suspense fallback="Loading page">
        <LazyTestimonialsPage />
      </React.Suspense>
    ),
  },
  {
    path: "/services",
    element: (
      <React.Suspense fallback="Loading page">
        <LazyServicesPage />
      </React.Suspense>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

