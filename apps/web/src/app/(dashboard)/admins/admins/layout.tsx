import '../../../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admins Dashboard',
  description: 'Weardrobe admin dashboard.',
};

export default function Template({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <div className='w-full'>
        {children}
    </div>
  );
}
