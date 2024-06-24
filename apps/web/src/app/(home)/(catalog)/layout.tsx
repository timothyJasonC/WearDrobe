import type { Metadata } from 'next';
import '../../globals.css';

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
    <div className='flex justify-center'>
      {children}
    </div>
  );
}
