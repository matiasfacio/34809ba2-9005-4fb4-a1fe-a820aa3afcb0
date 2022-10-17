import { useShoppingCart } from "../../context/ShoppingCartContext";
import garbageIcon from "../../images/trash.svg";
import { usePagination } from "../../hook/usePagination";
import { Event } from "../../context/EventsContext";
import "./cart.css";
import { useState } from "react";

export const ModalCartContainer = () => {
  const { shoppingCart, totalItemInCart } = useShoppingCart();
  const { prevPage, nextPage, hasPrevPage, hasNextPage, currentPage } =
    usePagination(totalItemInCart, 2);
  const [notificationToUser, setNotificationToUser] = useState<string | null>(
    null
  );

  const cartPage = shoppingCart.slice(currentPage * 2, currentPage * 2 + 2);
  if (cartPage.length === 0 && hasPrevPage) {
    prevPage();
  }

  const handleRemoveItemNotification = () => {
    setNotificationToUser("Event was deleted");
    setTimeout(() => {
      setNotificationToUser(null);
    }, 1000);
  };

  return (
    <>
      {totalItemInCart === 0 && <EmptyCart />}

      {cartPage.map((event) => {
        return (
          <SingleEventCart
            event={event}
            key={event._id}
            onDelete={handleRemoveItemNotification}
          />
        );
      })}
      {notificationToUser && (
        <p className="item-deleted-notification">{notificationToUser}</p>
      )}

      <div className="pagination">
        <button onClick={prevPage} disabled={!hasPrevPage} type="button">
          &#x276E;
        </button>
        <p>{currentPage + 1}</p>
        <button onClick={nextPage} disabled={!hasNextPage} type="button">
          &#x276F;
        </button>
      </div>
    </>
  );
};

const EmptyCart = () => <div className="empty-cart">Your cart is empty</div>;

export const SingleEventCart = ({
  event,
  onDelete,
}: {
  event: Event;
  onDelete: () => void;
}) => {
  const { removeItemFromCart } = useShoppingCart();
  const handleRemoveClick = () => {
    removeItemFromCart(event._id);
    onDelete();
  };

  return (
    <div className="event_on-cart-container">
      <div className="single-event-cart">
        <div>
          <div>{event.title}</div>
          <div>- {event.city} -</div>
        </div>
        <div>
          <button
            type="button"
            className="delete_icon"
            onClick={handleRemoveClick}
          >
            <img src={garbageIcon} alt="delete" width="15px" />
          </button>
        </div>
        <div>
          <img
            src={event.flyerFront}
            alt={event.title.slice(0, 10)}
            width={70}
            height={70}
          />
        </div>
      </div>
    </div>
  );
};
