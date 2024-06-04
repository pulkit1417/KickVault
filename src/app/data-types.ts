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
}

export interface cart{
  name:string,
  price:string,
  color:string,
  image:string,
  description:string,
  id:string| undefined,
  quantity:undefined | number,
  productId:string,
  userId:string
}
