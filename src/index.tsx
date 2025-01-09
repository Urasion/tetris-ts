import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootLayout from './components/layout/RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import StartPage from './pages/StartPage';
import PlayPage from './pages/PlayPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'tetris',
        element: <MainLayout />,
        children: [
          {
            path: 'start',
            element: <StartPage />,
          },
          {
            path: 'play',
            element: <PlayPage />,
          },
        ],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router}></RouterProvider>);
