import Product from "./Product";

interface DataItems {
  attributes: any;
  children: Product
}

type Data = DataItems[]

interface Cart {
  id: number
  attributes: {
    email: string;
    userName: string;
    products: {
      data: Data
    }
  }
}

export default Cart;