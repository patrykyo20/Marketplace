interface Child {
  text: string;
  type: string;
}

interface DescriptionItem {
  type: string;
  children: Child[];
}

type Description = DescriptionItem[];


interface Product {
  id: number;
  attributes: {
    products: any;
    title: string;
    category: string;
    description: Description;
    pricing: number;
    instantDelivery: boolean;
    banner: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}


export default Product;