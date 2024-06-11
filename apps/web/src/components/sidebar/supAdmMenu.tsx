'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const SupAdmMenu = () => {
    const pathname = usePathname()
    const [activeButton, setActiveButton] = useState('overviews')

    useEffect(() => {
          const route = pathname.split('/')
          const currentPage = route[2]
          setActiveButton(currentPage)
    }, [pathname]);

    return (
        <div>
            <ul className='space-y-4'>
                <li><Link href={'/admins/warehouses'} className={`hover:cursor-pointer hover:text-gray-500 ${activeButton === 'warehouses' ? 'font-bold' : ''}`}>Warehouses</Link></li>
                <li><Link href={'/admins/products'} className={`hover:cursor-pointer hover:text-gray-500 ${activeButton === 'products' ? 'font-bold' : ''}`}>Products</Link></li>
                <li><Link href={'/admins/stocks'} className={`hover:cursor-pointer hover:text-gray-500 ${activeButton === 'stocks' ? 'font-bold' : ''}`}>Stocks</Link></li>
                <li><Link href={'/admins/transactions'} className={`hover:cursor-pointer hover:text-gray-500 ${activeButton === 'transactions' ? 'font-bold' : ''}`}>Transactions</Link></li>
                <li><Link href={'/admins/admins'} className={`hover:cursor-pointer hover:text-gray-500 ${activeButton === 'admins' ? 'font-bold' : ''}`}>Admins</Link></li>
                <li><Link href={'/admins/users'} className={`hover:cursor-pointer hover:text-gray-500 ${activeButton === 'users' ? 'font-bold' : ''}`}>Users</Link></li>
            </ul>
        </div>
    );
};
