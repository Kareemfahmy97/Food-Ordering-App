import CartContext from "./cart-context";
import {useReducer} from 'react';


const defaultCartState = {
    items : [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM'){
        const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

        const existCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existCartItem = state.items[existCartItemIndex];

        let updatedItems;

        if (existCartItem){
          const updatedItem = {
                ...existCartItem,
                amount :existCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existCartItemIndex] = updatedItem; 
        }else {

            updatedItems = state.items.concat(action.item);
        }

        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "REMOVE_ITEM"){

        const existCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
            );
            const existItem= state.items[existCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existItem.price;
            let updatedItems;
            if (existItem.amount === 1){
                updatedItems = state.items.filter(item => item.id !== action.id);
            }else {
                const updatedItem = {...existItem, amount: existItem.amount - 1};
                updatedItems = [...state.items];
                updatedItems[existCartItemIndex] = updatedItem;
            }
            return{
                items : updatedItems,
                totalAmount: updatedTotalAmount,
            };
    };

    if(action.type === 'CLEAR'){
    return defaultCartState;
    }

    return defaultCartState;
};




const CartProvider = (props) => {
    const [cartState, dispatchCartAction] =useReducer(cartReducer, defaultCartState);
    
    
    const addItemToCartHandler = item => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item,
        });
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id,
        });
    };


    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount : cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart : clearCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;