import Image from 'next/image';
import React from 'react';
import { ChevronRightSquare } from 'lucide-react'; 
import Product from '../_types/Product';
import Link from 'next/link';

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const { title, category, pricing } = product.attributes;
  const { url } = product.attributes.banner.data.attributes;

  return (
    <Link href={`/product/${product.id}`}>
      <div className='border border-gray-50 max-w-[400px] p-1 hover:border cursor-pointer rounded-lg hover:border-blue-300'>
        <Image src={url}
          alt="banner"
          width={400}
          height={350}
          className='rounded-t-lg h-[190px] object-cover'
        />
        <div className='flex justify-between items-center bg-gray-50 p-2 rounded-b-lg'>
          <div className='py-3'>
            <h2 className='text-[14px] font-medium line-clamp-2'>{title}</h2>
            {category && <h2 className='text-[12px] text-gray-500 flex gap-2'>
              <ChevronRightSquare className='h-4 w-4' /> {category}
            </h2>}
          </div>
          <div>
            <h2 className='font-medium'>${pricing}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
