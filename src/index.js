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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback="Loading page">
        <LazyHomePage />
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

