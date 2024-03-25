'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ProductList from './ProductList';
import GlobalApi from '../_utils/GlobalApi';
import Product from '../_types/Product';

function ProductPage() {
  const [productList, setProductList] = useState<Product[] | []>([]);
  const [brandNews, setBrandNews] = useState<Product[] | []>([]);
  const [sourceCode, setSourceCode] = useState<Product[] | []>([]);
  const [icons, setIcons] = useState<Product[] | []>([]);

  const getLatestProduct = () => {
    GlobalApi.getLatestProducts().then((response) => {
      setProductList(response.data.data)
    }).catch(error => console.log(error))
  }

  useEffect(() => {
    getLatestProduct();
  }, [])

  useEffect(() => {
    const brandNewsProducts = productList.slice().sort((a, b) => b.id - a.id);
    const sourceCodeProducts = productList.filter(products => products.attributes.category === 'Source Code');
  
    const iconsProducts = productList.filter(products => products.attributes.category === 'Icons');

    console.log(iconsProducts)

    setBrandNews(brandNewsProducts);
    setSourceCode(sourceCodeProducts);
    setIcons(iconsProducts);
  }, [productList]);

  return productList && ( 
    <div className='px-10 md:px-20 mt-10'>
      <h1 className='font-bold text-[26px] mt-10 mb-4'>Brand New</h1>
      <ProductList productList={brandNews} />

      <h1 className='font-bold text-[26px] mt-10 mb-4'>Source Code</h1>
      <ProductList productList={sourceCode} />

      <h1 className='font-bold text-[26px] mt-10 mb-4'>Icons</h1>
      <ProductList productList={icons} />
    </div>
  )
}

export default ProductPage;