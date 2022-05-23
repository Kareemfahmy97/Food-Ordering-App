import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  };
  const orderHandler = (event) => {
    setIsCheckOut(true);
  };

  const finalOrderHandler = async (UserData) => {
    setIsSubmitting(true);
    await fetch(
      "https://task-react-project-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: UserData,
          orderedItems: cartCtx.items,
        }),
      }
      );
      setIsSubmitting(false);
      setAlreadySubmitted(true);
      cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActionButton = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  );


    const myCartModalContent = (<React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && <Checkout onFinalConfirm={finalOrderHandler} onCancel={props.onClose}/>}
      {!isCheckOut && modalActionButton}

    </React.Fragment>
    );
    
    const isSubmittingModalContent = <p>Sending your order data ... </p>

    const didSubmitModalContent = (
      <React.Fragment>
        <p>Successfully received your order🥰</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
  return (
    <Modal onClose={props.onClose}>
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && !alreadySubmitted && myCartModalContent}
      {alreadySubmitted && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
