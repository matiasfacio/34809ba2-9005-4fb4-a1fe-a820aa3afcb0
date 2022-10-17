import { useState } from "react";
import { Search } from "../search/Search";
import shoppingCartIcon from "../../images/shopping-cart.svg";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Modal } from "../modal/Modal";
import "./navbar.css";
import { ModalCartContainer } from "../cart/ModalCartContainer";
import { ModalCartFooter } from "../cart/ModalCartFooter";
import { ModalCartHeader } from "../cart/ModalCartHeader";
import { Tag, useEvents } from "../../context/EventsContext";
import { logoStyle } from "../events/Events";

const NavBar = () => {
  const { sortByTag, clearFilters } = useEvents();

  const handleSort = (tag: Tag | "no-filter") => {
    if (tag === "no-filter") {
      clearFilters();
    } else {
      sortByTag(tag);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar_left">
        <Search />
        <div className="filter">
          <label className="filter__label">
            Filter by:
            <select
              onChange={(e) => handleSort(e.target.value as Tag)}
              defaultValue="no-filter"
            >
              <option value="no-filter">no-filter</option>
              {Object.keys(logoStyle).map((tag) => (
                <option value={tag} key={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="navbar_right">
        <ShoppingCartIcon />
      </div>
    </div>
  );
};

export default NavBar;

const ShoppingCartIcon = () => {
  const { totalItemInCart } = useShoppingCart();
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleModalClose = () => {
    setModalVisibility(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn_shopping-cart"
        onClick={() => setModalVisibility(true)}
      >
        <img
          src={shoppingCartIcon}
          alt="shopping cart"
          width="20px"
          height="20px"
        />
        <span className="btn_shopping-cart-value">{totalItemInCart}</span>
      </button>
      {modalVisibility && (
        <Modal onClose={handleModalClose}>
          <div className="modal__container__internal-header">
            <ModalCartHeader />
          </div>
          <div className="modal__container__internal-container">
            <ModalCartContainer />
          </div>
          <div className="modal__container__internal-footer">
            <ModalCartFooter />
          </div>
        </Modal>
      )}
    </>
  );
};
