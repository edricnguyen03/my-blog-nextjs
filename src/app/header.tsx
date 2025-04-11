import Link from 'next/link';
import Container from './container';
import ClientLink from './clientlink';
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
                                <ClientLink href='/'>Home</ClientLink>
                            </li>
                            <li>
                                <ClientLink href='/#about'>About</ClientLink>
                            </li>
                            <li>
                                <ClientLink href='/#contact'>Contact</ClientLink>
                            </li>
                            <li>
                                <ClientLink href='/blogs'>Blog</ClientLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    {userCookie ? (
                        <Link href='/auth?page=logout' className='bg-red-500 text-white px-4 py-2 text-base font-bold rounded-sm'>Logout</Link>
                    ) : (
                        <>
                            <Link href='/auth?page=login' className='text-slate-50 px-4 py-2 text-base font-base rounded-sm'>Login</Link>
                            <Link href='/auth?page=sign-up' className='bg-slate-50 text-slate-950 px-4 py-2 text-base font-bold rounded-sm'>Sign-Up</Link>
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
}

export default Header;