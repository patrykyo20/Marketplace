import React from 'react'
import ProductItem from './ProductItem'

function ProductList({productList} : {productList: any}) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
      {productList.map((product: any, index: number) => index <= 3 &&(
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductList