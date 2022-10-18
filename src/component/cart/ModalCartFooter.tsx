import { useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Modal } from "../modal/Modal";
import "./cart.css";

export const ModalCartFooter = ({ onClose }: { onClose: () => void }) => {
  const { totalItemInCart, clearCart } = useShoppingCart();
  const [modalVisibility, setModalVisibility] = useState(false);

  const handlePayment = () => {
    clearCart();
    setModalVisibility(true);
  };

  return (
    <>
      <div className="btn_pay-container">
        <button
          type="button"
          className="btn_pay-now"
          disabled={totalItemInCart === 0}
          onClick={handlePayment}
        >
          Check out
        </button>
      </div>
      {modalVisibility && (
        <Modal
          onClose={() => {
            setModalVisibility(false);
            onClose();
          }}
        >
          <div className="thank-you-for-buying">
            <h2>Thank you for buying with us</h2>
          </div>
        </Modal>
      )}
    </>
  );
};
