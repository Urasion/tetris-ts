import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import StartPage from './pages/StartPage';
import PlayPage from './pages/PlayPage';
import OptionPage from './pages/OptionPage';
import RootLayout from './components/layout/RootLayout';
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
          {
            path: 'option',
            element: <OptionPage />,
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
