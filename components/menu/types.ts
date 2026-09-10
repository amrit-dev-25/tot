export type Macros = {
  cals: number;
  carbs: number;
  protein: number;
};

export type MenuItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  isVeg: boolean;
  description?: string;
  macros?: Macros;
};

export type MenuCategory = {
  id: string;
  label: string;
  image: string;
  items: MenuItem[];
};