import { useContext, useState, useEffect } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

  const [btnIsHighlighted, setIsButtonIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  },0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

  const { items } = cartCtx;
  useEffect(() => {
    if(cartCtx.items.length === 0){
      return;
    }
    setIsButtonIsHighlighted(true);

    const timer = setTimeout(()=>{
      setIsButtonIsHighlighted(false);
    },300);

    return () => {
      clearTimeout(timer);
    }

  }, [items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;