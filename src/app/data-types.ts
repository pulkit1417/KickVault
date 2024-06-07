export interface SignUp {
  name: string;
  password: string;
  email: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface product {
  name: string;
  price: string;
  description: string;
  color : string;
  image: string;
  id:string;
  quantity: undefined | number;
  productId: string | undefined;
}

export interface cart{
  name:string,
  price:string,
  color:string,
  image:string,
  description:string,
  id:string|undefined,
  quantity:undefined | number,
  productId:string,
  userId:string
}

export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  shipping:number,
  total:number
}

export interface order  {
  email:string,
  address:string,
  phone:string,
  totalPrice:number,
  userId:string,
  id:string|undefined,
}
