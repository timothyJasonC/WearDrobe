import '../../../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Stock Dashboard',
  description: 'Weardrobe admin stock dashboard.',
};

export default function Template({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <div className='w-full'>
        {children}
    </div>
  );
}
