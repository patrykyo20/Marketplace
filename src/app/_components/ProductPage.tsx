'use client'

import React, { useEffect, useState } from 'react'
import ProductList from './ProductList';
import GlobalApi from '../_utils/GlobalApi';

function ProductPage() {
  const [productList, setProductList] = useState<any>([]);

  const getLatestProduct = () => {
    GlobalApi.getLatestProducts().then((response) => {
      setProductList(response.data.data)
    }).catch(error => console.log(error))
  }

  useEffect(() => {
    getLatestProduct();
  }, [])

  return productList && ( 
    <div className='px-10 md:px-20 mt-10'>
      <h1 className='font-bold text-[26px] mt-10 mb-4'>Brand New</h1>
      <ProductList productList={productList} />

      <h1 className='font-bold text-[26px] mt-10 mb-4'>Source Code</h1>
      <ProductList productList={productList} />

      <h1 className='font-bold text-[26px] mt-10 mb-4'>Icons</h1>
      <ProductList productList={productList} />
    </div>
  )
}

export default ProductPage;