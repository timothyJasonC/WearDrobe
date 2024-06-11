'use client';

import { AdminSideBar } from "@/components/sidebar/adminSideBar";

export default function Template({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <AdminSideBar>
        {children}
    </AdminSideBar>
  );
}
