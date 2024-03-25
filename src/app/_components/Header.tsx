'use client'
import { UserButton, useUser } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import CartContext from '../_context/CartContext';
import GlobalApi from '../_utils/GlobalApi';
import Cart from './Cart';

function Header() {
  const {user} = useUser();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const { cart, setCart } = useContext(CartContext);

  const getCartItems = useCallback(() => {
    GlobalApi.getUserCart(user?.primaryEmailAddress?.emailAddress).then(response => {
      setCart(response.data.data);
    });
  }, [setCart, user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    if (window.location.href.includes('sign-up') || window.location.href.includes('sign-in')) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    getCartItems();
  }, [getCartItems, user]);

  return !isLogin && (
    <header className="bg-white">
      <div className="mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <Image
          src="/logo.svg"
          alt={'logo'}
          width={90}
          height={100}
        />

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Home </a>
              </li>

              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Explore </a>
              </li>
          
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
              </li>

              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
              </li>

              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact us </a>
              </li>


            </ul>
          </nav>

          <div className="flex items-center gap-4">
           {!user ?
            <div className="sm:flex sm:gap-4">
                <a
                  className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
                  href="/sing-in"
                >
                  Login
                </a>

                <a
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-blue-600 sm:block"
                  href="/sing-up"
                >
                  Register
                </a>
              </div>
              :
              <div className='flex items-center gap-5'>
                <div className='flex gap-2' onClick={() => setOpenCart(!openCart)}>
                  <ShoppingCart className='cursor-pointer'/> {`(${cart?.length})`}
                </div>
                <UserButton />
              </div>
            }

            {openCart && <Cart />}

            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;