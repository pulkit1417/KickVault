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
}

export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number| undefined,
  quantity:undefined | number,
  productId:number,
  userId:number
}
