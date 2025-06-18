import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import { FC, lazy, Suspense } from 'react';


const AuthPage = lazy(() => import('./pages/auth/AuthPage'));
const ChatPage = lazy(() => import('./pages/chat/ChatPage'));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Загрузка страницы...</div>}>
        <ChatPage />
      </Suspense>
    ),
    children: [
      {
        path: "auth",
        index: true,
        element: (
          <Suspense fallback={<div>Загрузка страницы...</div>}>
            <AuthPage />
          </Suspense>
        )
      },
      {
        path: "chat",
        element: (
          <Suspense fallback={<div>Загрузка страницы...</div>}>
            <ChatPage />
          </Suspense>
        )
      },
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router}/>;
}

export default App;
