'use client'

import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useMemo, useState } from 'react'
import Product from '../../_types/Product';
import Breadcrumbs from '@/app/_components/Breadcrumbs';
import ProductBanner from './_components/ProductBanner';
import ProductInfo from './_components/ProductInfo';
import ProductList from '@/app/_components/ProductList';
import { usePathname } from 'next/navigation';

function ProductPage({ params } : { params : { productId: string } }) {
  const path = usePathname()
  const [product, setProduct] = useState<Product | null>(null)
  const [
    productsByCategory,
    setProductsByCategory,
  ] = useState<Product[]>([])

  const getProductById = () => {
    GlobalApi.getProductById(params?.productId).then(response => {
      setProduct(response.data.data)
      getProductListByCategory(response.data.data)
    })
  }

  const getProductListByCategory = (product: Product) => {
    GlobalApi.getProductByCategory(product?.attributes.category).then(response => {
      setProductsByCategory(response.data.data)
    })
  }

  useEffect(() => {
    getProductById()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='p-5 py-12 px-5 md:px-28'>
      <Breadcrumbs path={path} />
      <div className='grid grid-cols-1 sm:grid-cols-2 mt-10 justify-between gap-5 sm:gap-5'>
        <ProductBanner product={product} />
        <ProductInfo product={product} />
      </div>
      {productsByCategory &&
        <div className='mt-12'>
          <h2 className='font-medium text-[32px] py-5'>Similar Products</h2>
          <ProductList productList={productsByCategory} />
        </div>
      }
    </div>
  )
}

export default ProductPage;