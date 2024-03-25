import CartContext from '@/app/_context/CartContext';
import Product from '@/app/_types/Product'
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

interface ProductItemProps {
  product: Product | null;
}

function ProductInfo({product}: ProductItemProps) {
  const { title, category, pricing, instantDelivery } = product?.attributes ?? {};
  const description = product?.attributes.description[0].children[0].text;

  const { user } = useUser();
  const router = useRouter();
  const {cart, setCart} = useContext(CartContext)

  const onAddToCartClick = () => {
    if (!user) {
      router.push('/sing-in')
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          products: [product?.id]
        },
      }

      GlobalApi.postProductToCart(data).then((response: any) => {
        console.log(response)
        console.log(product)
        setCart((cart: any) => [...cart, product])
      }).catch(error => {
        throw new Error(error)
      })
    }
  }

  return (
    <>
      {product 
      ? 
        <div>
          <h2 className='text-[20px]'>{title}</h2>
          <h2 className='text-[15px] text-gray-400'>{category}</h2>
          <h2 className='text-[15px] mt-5 text-gray-700'>{description}</h2>
          <div className='flex mt-5 gap-3'>
            {instantDelivery ? (
              <>
                <BadgeCheck className='text-green-500' />
                <h2 className='text-green-500'>Eligble for Instant Delivery</h2>
              </>
            ) : (
              <>
                <AlertOctagon className='text-yellow-500' />
                <h2 className='text-yellow-500'>Inadequate for Instant Delivery</h2>
              </>
            )}
            
          </div>
          <h2 className='text-[32px] text-primary font-bold mt-5'>${pricing}</h2>
          <button
            className='flex gap-2 p-3
            bg-primary text-white rounded-lg
            px-10 mt-5 hover:bg-blue-700 transition-all'
            onClick={() => onAddToCartClick()}
          >
            <ShoppingCart />
            Add to Cart
          </button>
        </div> 
        :
        <div className='flex flex-col gap-5'>
          <div className='h-[20px] w-[400px] bg-slate-200 animate-pulse'>
          </div>
          <div className='h-[20px] w-[70px] bg-slate-200 animate-pulse'>
          </div>
          <div className='h-[25px] w-[400px] bg-slate-200 animate-pulse'>
          </div>
          <div className='h-[20px] w-[400px] bg-slate-200 animate-pulse'>
          </div>
          <div className='h-[20px] w-[400px] bg-slate-200 animate-pulse'>
          </div>
          <div className='h-[25px] w-[150px] bg-slate-200 animate-pulse'>
          </div>
        </div>
      }
    </>
  )
}

export default ProductInfo;