import {useState, useRef} from 'react';
import classes from './Checkout.module.css';

const isNotEmpty = value => value.trim() !== '';
const isElevenChar = value => value.trim().length === 11;

const Checkout = (props) =>{
    
    const [fromValidity, setFormValidity] = useState({
        name: true,
        address: true,
        phone: true,
        city: true,
    })

    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();

    
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredAddress = addressRef.current.value;
        const enteredCity = cityRef.current.value;
        const enteredPhone = phoneRef.current.value;

        const enteredNameIsValid = isNotEmpty(enteredName);
        const enteredAddressIsValid = isNotEmpty(enteredAddress);
        const enteredCityIsValid = isNotEmpty(enteredCity);
        const enteredPhoneIsValid = isElevenChar(enteredPhone);

        setFormValidity({
            name: enteredNameIsValid,
            phone: enteredPhoneIsValid,
            city: enteredCityIsValid,
            address: enteredAddressIsValid,
    });

        const formIsValid = enteredAddressIsValid && enteredNameIsValid && enteredCityIsValid && enteredPhoneIsValid;
        
        if(!formIsValid){
            return;
        }

        props.onFinalConfirm({
            name: enteredName,
            phone: enteredPhone,
            city: enteredCity,
            address: enteredAddress,
        })
    }
    const nameClassControlOption = `${classes.control} ${fromValidity.name ? '' : classes.invalid}`;
    const addressClassControlOption = `${classes.control} ${fromValidity.address ? '' : classes.invalid}`;
    const phoneClassControlOption = `${classes.control} ${fromValidity.phone ? '' : classes.invalid}`;
    const cityClassControlOption = `${classes.control} ${fromValidity.city ? '' : classes.invalid}`;
    return (
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={nameClassControlOption}>
          <label htmlFor="name">Your name</label>
          <input id="name" type="text" ref={nameRef} />
          {!fromValidity.name && (
            <p className={classes["error-text"]}>
              Please enter your full name!
            </p>
          )}
        </div>
            
        <div className={cityClassControlOption}>
          <label htmlFor="city">City</label>
          <input id="city" type="text" ref={cityRef} />
          {!fromValidity.city && (
            <p className={classes["error-text"]}>Please enter your city!</p>
          )}
        </div>

        <div className={addressClassControlOption}>
          <label htmlFor="address">Address</label>
          <input id="address" type="text" ref={addressRef} />
          {!fromValidity.address && (<p className={classes['error-text']}>Please enter your address!</p>)} 
        </div>

        <div className={phoneClassControlOption}>
          <label htmlFor="number">Phone number</label>
          <input id="number" type="tel" ref={phoneRef} />
          {!fromValidity.phone && (
            <p className={classes["error-text"]}>
              Must be at least 11 characters long!
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Submit</button>
        </div>
      </form>
    );
}

export default Checkout;