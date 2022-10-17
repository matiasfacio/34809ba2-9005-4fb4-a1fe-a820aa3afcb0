import { createContext, ReactNode, useContext, useState } from "react";
import { Event } from "./EventsContext";

interface ShoppingCart {
  shoppingCart: Event[];
  addItemToCart: (arg: Event) => void;
  totalItemInCart: number;
  findItemInCart: (id: number) => Event | undefined;
  removeItemFromCart: (id: number) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCart);

export const ShoppingCartContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [shoppingCart, setShoppingCart] = useState<Event[]>([]);

  const addItemToCart = (item: Event) =>
    setShoppingCart((prev) => [...prev, item]);

  const removeItemFromCart = (id: number) =>
    setShoppingCart((prev) => prev.filter((event) => event._id !== id));

  const totalItemInCart = shoppingCart.length;

  const findItemInCart = (id: number) =>
    shoppingCart.find((event) => event._id === id);

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        addItemToCart,
        totalItemInCart,
        findItemInCart,
        removeItemFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error("this hook can be use within the context provider");
  }
  return context;
};
