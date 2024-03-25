'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react'
import CartContext from '../_context/CartContext';
import Cart from '../_types/Cart';
import Image from 'next/image';
import GlobalApi from '../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';

function Cart() {
  const {user} = useUser();
  const {cart, setCart} = useContext(CartContext)
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const getTotalAmount = () => {
    let amount = 0

    cart.forEach((product: Cart) => {
      amount += product.attributes.products.data[0].attributes.pricing;
    })

    amount = Number(amount.toFixed(2));

    setTotalPrice(amount)
  }

  const getCartItems = () => {
    GlobalApi.getUserCart(user?.primaryEmailAddress?.emailAddress).then(response => {
      setCart(response.data.data);
    });
  };

  useEffect(() => {
    getTotalAmount();
  }, [cart])

  const deleteCartProduct = (productId: number) => {
    GlobalApi.deleteUserCart(productId).then(response => {
      getCartItems()
    })
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart.map((product: Cart) => {
                const { title, category, pricing, instantDelivery } = product.attributes.products.data[0].attributes;
                const url = product.attributes.products.data[0].attributes.banner.data.attributes.url;
                
                return (
                  <li className="flex items-center gap-4" key={product.id}>
                    <Image
                      src={url}
                      alt={title}
                      height={150}
                      width={150}
                      className="size-16 rounded object-cover"
                    />
    
                    <div>
                      <h3 className="text-sm text-gray-900">{title}</h3>
    
                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">{category}</dt>
                        </div>
    
                        <div>
                          <dt className="inline">${pricing}</dt>
                        </div>
                      </dl>
                    </div>
    
                    <div className="flex flex-1 items-center justify-end gap-2">
                      <div>
                        <dt className="inline">${pricing}</dt>
                      </div>
    
                      <button
                        className="text-gray-600 transition hover:text-red-600"
                        onClick={() => deleteCartProduct(product.id)}
                      >
                        <span className="sr-only">Remove item</span>
    
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                )
              })}

            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>${totalPrice}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <a
                    href="#"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart;