import '../../../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Product Dashboard',
  description: 'Weardrobe admin product dashboard.',
};

export default function Template({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <div className='w-full flex flex-col min-h-screen overflow-x-hidden p-4 sm:p-8 lg:px-10 lg:py-6'>
        {children}
    </div>
  );
}


