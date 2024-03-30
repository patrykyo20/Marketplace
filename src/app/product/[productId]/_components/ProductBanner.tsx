import Product from '@/app/_types/Product'
import React from 'react'
import Image from 'next/image'
import SkeletonLoader from '@/app/_components/SkeletonLoader';

interface ProductBannerProps {
  product: Product | null;
}

const IMAGE_SIZE = {
  height: 400,
  width: 400,
}

function ProductBanner({product}: ProductBannerProps) {
  const url = product?.attributes.banner.data.attributes.url;

  return (
    <>
      {url ? 
        <Image
          src={url}
          alt='banner'
          height={IMAGE_SIZE.height}
          width={IMAGE_SIZE.width}
          className='rounded-lg object-cover'
        />
        :
        <div style={{ height: "400px", width: "400px" }} className={`h-400 w-400 bg-slate-200 animate-pulse`}></div>
      }
    </>
  )
}


export default ProductBanner