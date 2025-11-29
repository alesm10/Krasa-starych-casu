export enum Category {
  CUPS = 'Hrníčky',
  PLATES = 'Talíře',
  TEAPOTS = 'Konvice',
  SETS = 'Sady',
  DECOR = 'Dekorace'
}

export enum Condition {
  MINT = 'Výborný (Mint)',
  EXCELLENT = 'Skvělý',
  GOOD = 'Dobrý (běžné opotřebení)',
  DAMAGED = 'Poškozeno (pro sběratele)'
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  condition: Condition;
  imageUrl: string;
  year?: string;
  manufacturer?: string;
}

export interface CartItem extends Product {
  quantity: number;
}