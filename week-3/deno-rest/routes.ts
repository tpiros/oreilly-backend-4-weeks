import { products } from './data.ts';
import IProduct from './iproduct.ts';
const displayProducts = ({ response }: { response: any }) => {
  response.body = products;
};

const displayProduct = ({
  params,
  response,
}: {
  params: { name: string };
  response: any;
}) => {
  const [product] = products.filter((product) => product.name === params.name);
  response.status = 200;
  response.body = product;
};

const addProduct = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const sentObject = await request.body();
  const product: IProduct = await sentObject.value;
  products.push(product);
  response.status = 201;
  response.body = { data: 'Product added' };
};

const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: {
    name: string;
  };
  request: any;
  response: any;
}) => {
  const temp = products.filter((product) => product.name === params.name);
  const body = await request.body();
  const { price }: { price: number } = body.value;

  if (temp.length) {
    temp[0].price = price;
    response.status = 200;
    response.body = { data: 'Success' };
    return;
  }

  response.status = 400;
  response.body = { data: `Product ${params.name} cannot be found.` };
};

const deleteProduct = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const currentLength = products.length;
  const findProduct = (element: IProduct) => element.name === params.name;
  const productIndex = products.findIndex(findProduct);
  products.splice(productIndex, 1);

  if (products.length === currentLength) {
    response.status = 400;
    response.body = { data: `Product ${params.name} cannot be found.` };
    return;
  }

  response.body = { data: 'Product deleted' };
  response.status = 200;
};

export {
  displayProducts,
  displayProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
