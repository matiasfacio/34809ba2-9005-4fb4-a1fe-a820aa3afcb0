import { useShoppingCart } from "../../context/ShoppingCartContext";
import "./cart.css";

export const ModalCartFooter = () => {
  const { totalItemInCart } = useShoppingCart();

  return (
    <div className="btn_pay-container">
      <button
        type="button"
        className="btn_pay-now"
        disabled={totalItemInCart === 0}
      >
        Check out
      </button>
    </div>
  );
};
