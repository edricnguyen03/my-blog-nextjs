import Link from 'next/link';
import Container from './container';
import { cookies } from "next/headers";
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
const Header = () => {

    const userCookie = cookies().get("user")
    return (
        <header className='bg-slate-950 text-slate-50'>
            <Container classNames='flex items-center justify-between py-6'>
                <div className='flex items-center justify-center gap-6'>
                    <Link href='/' className='text-lg font-bold'>My Blog</Link>
                    <nav>
                        <ul className='flex gap-4 items-center justify-start'>
                            <li>
                                <Link href='/'>Home</Link>
                            </li>
                            <li>
                                <Link href='/#about'>About</Link>
                            </li>
                            <li>
                                <Link href='/#contact'>Contact</Link>
                            </li>
                            <li>
                                <Link href='/blogs'>Blog</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    {userCookie ? (
                        <Link href='/auth/logout' className='bg-red-500 text-white px-4 py-2 text-base font-bold rounded-sm'>Logout</Link>
                    ) : (
                        <>
                            <Link href='/auth/login' className='text-slate-50 px-4 py-2 text-base font-base rounded-sm'>Login</Link>
                            <Link href='/auth/sign-up' className='bg-slate-50 text-slate-950 px-4 py-2 text-base font-bold rounded-sm'>Sign-Up</Link>
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
}

export default Header;