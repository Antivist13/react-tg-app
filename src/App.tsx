import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import { FC, lazy, Suspense } from 'react';
import Loader from './UI/Loader/Loader';

const Auth = lazy(() => import('./pages/auth/AuthPage'));
const Home = lazy(() => import('./pages/home/HomePage'));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader/>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "auth",
    element: (
      <Suspense fallback={<Loader/>}>
        <Auth />
      </Suspense>
    )
  },
  {
    path: "home",
    element: (
      <Suspense fallback={<Loader/>}>
        <Home />
      </Suspense>
    )
  },
]);

const App: FC = () => {
  return <RouterProvider router={router}/>;
}

export default App;
