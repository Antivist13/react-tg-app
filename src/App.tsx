import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router';
import './App.css';
import {
  FC,
  lazy,
  Suspense
} from 'react';
import Loader from './UI/Loader/Loader';
import "./App.css";

const Auth = lazy(() => import('./pages/auth/AuthPage'));
const Home = lazy(() => import('./pages/home/HomePage'));
const Navbar = lazy(() => import('./components/navbar/Navbar'));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader/>}>
        <Navbar />
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader/>}>
            <Home />
          </Suspense>
        )
      },
    ]
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
        <Navbar />
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true, // Корневой маршрут
        element: (
          <Suspense fallback={<Loader/>}>
            <Home />
          </Suspense>
        )
      },
    ]
  },
]);

const App: FC = () => {
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
