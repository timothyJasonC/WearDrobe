import '../../globals.css';
import { AdminSideBar } from "@/components/sidebar/adminSideBar";
import { StoreProvider } from '@/app/storeProvider';
import { Toaster } from 'sonner';
import { Poppins } from 'next/font/google';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from './products/loading';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Weardrobe admin dashboard.',
};

export default function Template({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <StoreProvider>
        <html lang="en">
          <body className={poppins.className}>
            <AdminSideBar>
            <Suspense fallback={<Loading/>}>
                <Toaster position="top-center" expand={true} richColors/>
                {children}
            </Suspense>
            </AdminSideBar>
          </body>
        </html>
    </StoreProvider>
    
  );
}
