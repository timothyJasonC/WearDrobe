import '../../../globals.css';
import type { Metadata } from 'next';
import DashboardWrapper from '../_components/DashboardWrapper';

export const metadata: Metadata = {
  title: 'Sales Report Dashboard',
  description: 'Weardrobe Sales Report dashboard.',
};

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {

  return (
      <div className='w-full flex flex-col min-h-screen overflow-x-hidden p-4 sm:p-8 lg:px-10 lg:py-6'>
        {children}
      </div>
  );
}
