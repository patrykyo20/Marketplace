import SkeletonLoader from '@/app/_components/SkeletonLoader';
import CartContext from '@/app/_context/CartContext';
import Product from '@/app/_types/Product'
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { AlertOctagon, BadgeCheck, BadgeDollarSign, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

interface ProductItemProps {
  product: Product | null;
}

const SKELETONS_FOR_ITEMS = [
  {
    height: 20,
    width: 400,
  },
  {
    height: 20,
    width: 70,
  },
  {
    height: 20,
    width: 200,
  },
  {
    height: 25,
    width: 200,
  },
  {
    height: 40,
    width: 80,
  },
  {
    height: 50,
    width: 150,
  },
  {
    height: 50,
    width: 150,
  },
]

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
            px-10 mt-5 hover:bg-blue-700 transition-all w-[210px]'
            onClick={() => onAddToCartClick()}
          >
            <ShoppingCart />
            Add to Cart
          </button>
          <button
            className='flex gap-2 p-3
            bg-green-600 text-white rounded-lg
            px-10 mt-5 hover:bg-green-700 transition-all w-[210px]'
            onClick={() => onAddToCartClick()}
          >
            <BadgeDollarSign />
            Buy product
          </button>
        </div> 
        :
        <div className='flex flex-col gap-5'>
          {SKELETONS_FOR_ITEMS.map((skeleton, index) => (
            <SkeletonLoader key={index} height={skeleton.height} width={skeleton.width} />
          ))}
        </div>
      }
    </>
  )
}

export default ProductInfo;