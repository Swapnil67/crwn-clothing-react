import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils.js";
import CartIcon  from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  const signOutHandler = async () => {  
    try {
      await signOutUser();
    } catch (err) {
      console.log("err ", err);
    }
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">Shop</Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutHandler}>Logout</span>
            ) : (
              <Link className="nav-link" to="/auth">Sign In</Link>
            )
          }
          <CartIcon />
        </div>
        { isCartOpen && <CartDropDown /> }
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
