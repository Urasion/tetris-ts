import MainLayout from './MainLayout';
import StartPage from '../../pages/StartPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function RootLayout() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
    },
    {
      path: '/start',
      element: <StartPage />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
