import { Fragment } from "react";
import classes from './Header.module.css';
import mealsImg from "../../assets/img.jpg";
import HeaderButton from "./HeaderButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>KA Sushi</h1>
        <HeaderButton onAvailableCart={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A cup of high quality coffee!" />
      </div>
    </Fragment>
  );
};

export default Header;
