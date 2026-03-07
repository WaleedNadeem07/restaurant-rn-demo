export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
};

export type TabParamList = {
  Menu: undefined;
  Cart: undefined;
};

export type MenuStackParamList = {
  MenuList: undefined;
  ItemDetail: { itemId: string };
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};