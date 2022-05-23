import React,{useContext , useEffect, useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";
import CartContext from '../../Store/cart-context';


const HeaderButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const {items}=cartCtx;

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  } , 0 );


  const buttonClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if(cartCtx.items.length === 0 ){
      return;
    }
    setButtonIsHighlighted(true);

    const timerHighligth = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timerHighligth);
    };
  },[items]);

  return (
    
    <button className={buttonClasses} onClick={props.onAvailableCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderButton;

