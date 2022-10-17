import cartIcon from "../../images/shopping-cart-main-color.svg";
import "./cart.css";

export const ModalCartHeader = () => {
  return (
    <div>
      <img src={cartIcon} alt="shopping cart" width={20} height={20} />
      <h2>Cart</h2>
    </div>
  );
};
