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
import AuthProvider from './context/AuthProvider'
import AllProductsProvider from './context/AllProductsProvider';
import CartItemsProvider from './context/CartItemsProvider';
import { LoadingAnimation } from './components';

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
const LazyOrderSuccess = React.lazy(() => import('./pages/OrderSuccess'));
const LazyPayOnDelivery = React.lazy(() => import('./pages/PayOnDelivery'));
const LazyPayWithCard = React.lazy(() => import('./pages/PayWithCard'));
const LazyPayWithMobileMoney = React.lazy(() => import('./pages/PayWithMobileMoney'));
const LazyTermsPage = React.lazy(() => import('./pages/TermsPage'));
const LazyPrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const LazyContactPage = React.lazy(() => import('./pages/ContactPage'));

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
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyHomePage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyAuthPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
    children: [
      {
        path: "forgot-password",
        element: (
          <React.Suspense fallback={<LoadingAnimation />}>
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
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyTestimonialsPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/services",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyServicesPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/mall",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyMallPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/faq",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyFAQPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/details/:slug",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyDetailsPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyCartPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/order",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyOrderPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/order-success",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyOrderSuccess />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/pay-on-delivery",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyPayOnDelivery />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/pay-with-card",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyPayWithCard />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/pay-with-mobile-money",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyPayWithMobileMoney />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/terms",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyTermsPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/privacy",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyPrivacyPage />
        </ErrorBoundary>
      </React.Suspense>
    ),
  },
  {
    path: "/contact",
    element: (
      <React.Suspense fallback={<LoadingAnimation />}>
        <ErrorBoundary>
          <LazyContactPage />
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
          <CartItemsProvider>
            <RouterProvider router={router} />
          </CartItemsProvider>
      </AllProductsProvider>
    </AuthProvider>
  </React.StrictMode>
);

