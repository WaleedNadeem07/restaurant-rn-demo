export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
};

export type TabParamList = {
  Menu: undefined;
  Cart: undefined;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};