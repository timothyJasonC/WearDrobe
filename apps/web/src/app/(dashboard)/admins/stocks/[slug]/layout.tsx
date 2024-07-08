import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Stock Dashboard',
  description: 'Weardrobe admin stock dashboard.',
};

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <div className='w-full overflow-hidden'>
        {children}
    </div>
  );
}
