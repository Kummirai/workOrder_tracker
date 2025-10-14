'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  const navLinkClasses = (href) => {
    const baseClasses = 'mx-2 my-1 md:my-0 px-3 py-1 rounded-md transition-colors duration-200';
    const activeClasses = 'bg-white text-[#5e17eb]';
    const inactiveClasses = 'hover:bg-white hover:text-[#5e17eb]';
    return `${baseClasses} ${pathname === href ? activeClasses : inactiveClasses}`;
  };

  const mobileNavLinkClasses = (href) => {
    const baseClasses = 'my-1 px-3 py-1 rounded-md w-full text-center transition-colors duration-200 text-base font-medium';
    const activeClasses = 'bg-white text-[#5e17eb]';
    const inactiveClasses = 'hover:bg-white hover:text-[#5e17eb]';
    return `${baseClasses} ${pathname === href ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className='bg-[#5e17eb] p-4 sm:p-5 sm:px-10 shadow-lg'>
      <nav className='flex items-center justify-between text-white'>
        <Link href='/dashboard' className='flex items-center'>
          <p className='font-extrabold font-serif tracking-wide text-xl sm:text-2xl'>Jobs</p>
        </Link>

        {/* Hamburger Button */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='text-white hover:text-gray-300 focus:outline-none'
          >
            <svg
              className={`w-8 h-8 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className='hidden md:flex items-center'>
          <Link href={'/dashboard'} className={navLinkClasses('/dashboard')}>
            Home
          </Link>
          <Link href={'/work_orders'} className={navLinkClasses('/work_orders')}>
            Add Work Order
          </Link>
          <Link href={'/boq_items'} className={navLinkClasses('/boq_items')}>
            BOQ Items
          </Link>
          <Link href={'/earnings'} className={navLinkClasses('/earnings')}>
            Earnings
          </Link>
          <Link href={'/settings'} className={navLinkClasses('/settings')}>
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className={`${navLinkClasses('/signout')} cursor-pointer`}
          >
            Sign Out
          </button>
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden mt-4 bg-[#5e17eb] rounded-md py-2'>
          <ul className='flex flex-col items-center'>
            <Link
              href='/dashboard'
              className={mobileNavLinkClasses('/dashboard')}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={'/work_orders'}
              className={mobileNavLinkClasses('/work_orders')}
              onClick={() => setIsMenuOpen(false)}
            >
              Add Work Order
            </Link>
            <Link
              href={'/boq_items'}
              className={mobileNavLinkClasses('/boq_items')}
              onClick={() => setIsMenuOpen(false)}
            >
              BOQ Items
            </Link>
            <Link
              href={'/earnings'}
              className={mobileNavLinkClasses('/earnings')}
              onClick={() => setIsMenuOpen(false)}
            >
              Earnings
            </Link>
            <Link
              href={'/settings'}
              className={mobileNavLinkClasses('/settings')}
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleSignOut();
              }}
              className={`${mobileNavLinkClasses('/signout')} w-full`}
            >
              Sign Out
            </button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;