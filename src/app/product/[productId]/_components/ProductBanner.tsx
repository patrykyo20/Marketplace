import Product from '@/app/_types/Product'
import React from 'react'
import Image from 'next/image'

interface ProductBannerProps {
  product: Product | null;
}

function ProductBanner({product}: ProductBannerProps) {
  const url = product?.attributes.banner.data.attributes.url ?? '';

  return (
    <div>
      {product ? 
      <Image
        src={url}
        alt='banner'
        width={400}
        height={400}
        className='rounded-lg object-cover'
      />
        :
      <div className='h-[400px] w-[400px] bg-slate-200 animate-pulse'>

      </div>
      }
    </div>
  )
}

export default ProductBanner