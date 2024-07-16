import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import 'animate.css'

// custom imports
import './index.css';
import './App.css';
import ProductProvider from './context/ProductProvider';
import AuthProvider from './context/AuthProvider'
import AllProductsProvider from './context/AllProductsProvider';
import CartItemsProvider from './context/CartItemsProvider';

const LazyHomePage = React.lazy(() => import('./App'));
const LazyAuthPage = React.lazy(() => import('./pages/AuthPage'));
const LazyTestimonialsPage = React.lazy(() => import('./pages/TestimonialsPage'));
const LazyServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const LazyMallPage = React.lazy(() => import('./pages/MallPage'));
const LazyForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const LazyFAQPage = React.lazy(() => import('./pages/FAQPage'));
const LazyDetailsPage = React.lazy(() => import('./pages/DetailsPage'));
const LazyCartPage = React.lazy(() => import('./pages/CartPage'));
const LazyOrderPage = React.lazy(() => import('./pages/OrderPage'));

const ErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    return <div>Something went wrong: {error.message}</div>;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback="Loading page">
        <ErrorBoundary>
          <LazyHomePage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <React.Suspense fallback="Loading page">
        <ErrorBoundary>
          <LazyAuthPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
    children: [
      {
        path: "forgot-password",
        element: (
          <React.Suspense fallback="Loading page">
            <ErrorBoundary>
              <LazyForgotPasswordPage />
            </ErrorBoundary>
          </React.Suspense>
        ),
      },
    ]
  },
  {
    path: "/testimonials",
    element: (
      <React.Suspense fallback="Loading page">
        <ErrorBoundary>
          <LazyTestimonialsPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/services",
    element: (
      <React.Suspense fallback="Loading page">
        <ErrorBoundary>
          <LazyServicesPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/mall",
    element: (
      <React.Suspense fallback="Loading page">
        <ErrorBoundary>
          <LazyMallPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/faq",
    element: (
      <React.Suspense fallback="Loading page">
        <ErrorBoundary>
          <LazyFAQPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/details/:slug",
    element: (
      <React.Suspense fallback="Loading page">
        <ErrorBoundary>
          <LazyDetailsPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <React.Suspense fallback="Loading page">
        <ErrorBoundary>
          <LazyCartPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/order",
    element: (
      <React.Suspense fallback="Loading page">
        <ErrorBoundary>
          <LazyOrderPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AllProductsProvider>
        <ProductProvider>
          <CartItemsProvider>
            <RouterProvider router={router} />
          </CartItemsProvider>
        </ProductProvider>
      </AllProductsProvider>
    </AuthProvider>
  </React.StrictMode>
);

