import MainLayout from './MainLayout';
import StartPage from '../../pages/StartPage';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}
