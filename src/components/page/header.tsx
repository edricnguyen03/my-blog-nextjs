'use client';

import Link from 'next/link';
import Container from '../container';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkLoginStatus = () => {
            const userCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('user='));
            setIsLoggedIn(!!userCookie);
        };

        checkLoginStatus();
    }, [pathname]);

    return (
        <header className='bg-slate-950 text-slate-50'>
            <Container classNames='flex items-center justify-between py-6'>
                <div className='flex items-center justify-center gap-6'>
                    <Link href='/' className='text-2xl font-bold'>My Blog</Link>
                    <nav>
                        <ul className='flex gap-4 items-center justify-start'>
                            <li>
                                <Link href='/'>Home</Link>
                            </li>
                            <li>
                                <Link href='/about'>About</Link>
                            </li>
                            <li>
                                <Link href='/contact'>Contact</Link>
                            </li>
                            <li>
                                <Link href='/blogs'>Blog</Link>
                            </li>
                            <li>
                                <Link href='/blogs-v2'>Blog-v2</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    {isLoggedIn ? (
                        <Link href='/auth/logout' className='bg-red-500 text-white px-4 py-2 text-base font-bold rounded-sm hover:bg-red-600 transition-colors'>Logout</Link>
                    ) : (
                        <>
                            <Link href='/auth/login' className='text-slate-50 px-4 py-2 text-base font-base rounded-sm hover:text-slate-200 transition-colors'>Login</Link>
                            <Link href='/auth/sign-up' className='bg-slate-50 text-slate-950 px-4 py-2 text-base font-bold rounded-sm hover:bg-slate-200 transition-colors'>Sign-Up</Link>
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
}

export default Header;