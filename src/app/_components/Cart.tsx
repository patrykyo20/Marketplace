import React, { useContext } from 'react'
import CartContext from '../_context/CartContext';
import Image from 'next/image'
import Product from '../_types/Product';
import Link from 'next/link';

function Cart() {
  const {cart} = useContext(CartContext);

  return cart.length > 0 && (
    <div className='h-[300px] w-[250px]
    bg-gray-100 z-10 rounded-md border shadow-sm
    absolute mx-10 right-10 top-12 p-5 overflow-auto transition'>
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
        {cart.map((product: Product) => {
          const { title, category, pricing } = product.attributes.products.data[0].attributes;
          const url = product.attributes.products.data[0].attributes.banner.data.attributes.url;
          return (
            <li className="flex items-center gap-4" key={product.id}>
              <Image
                src={url}
                width={50}
                height={50}
                alt="banner"
                className='rounded'
              />

              <div>
                <h3 className="text-sm text-gray-900 line-clamp-1">{title}</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">{category}</dt>
                  </div>

                  <div>
                    <dt className="inline">${pricing}</dt>
                  </div>
                </dl>
              </div>
            </li>
          );
        })}
        </ul>
      </div>

      <div className="space-y-4 text-center mt-5">
        <Link
          href="/cart"
          className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
        >
          View my cart {`(${cart.length})`}
        </Link>

        <a
          href="#"
          className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
        >
          Checkout
        </a>

        <a
          href="#"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
        >
          Continue shopping
        </a>
      </div>
    </div>
  )
}

export default Cart;