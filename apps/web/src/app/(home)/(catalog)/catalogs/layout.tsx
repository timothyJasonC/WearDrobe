import type { Metadata } from 'next';
import '../../../globals.css';
import { CatalogHeader } from './_components/catalogHeader';
import { CatalogSidebar } from './_components/catalogSidebar';

export const metadata: Metadata = {
  title: {
    template: '%s | Weardrobe',
    default: 'Weardrobe',
  },
  description: 'Weardrobe product catalog.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col items-center'>
      <CatalogHeader />
      <div className='px-4 sm:px-10 md:px-14 gap-10 flex justify-center mt-5'>
        <CatalogSidebar />
        {children}
      </div>
    </div>
  );
}
