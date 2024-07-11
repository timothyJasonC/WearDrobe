import '../../../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Product Dashboard',
  description: 'Weardrobe admin product dashboard.',
};

export default function Template({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <div className='w-full flex flex-col min-h-screen overflow-x-hidden'>
        {children}
    </div>
  );
}


