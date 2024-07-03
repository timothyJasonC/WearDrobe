import '../../../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Product Dashboard',
  description: 'Weardrobe admin product dashboard.',
};

export default function Template({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <div className='w-full overflow-hidden'>
        {children}
    </div>
  );
}
