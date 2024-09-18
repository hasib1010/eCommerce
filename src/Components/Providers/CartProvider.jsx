import React, { createContext, useReducer, useContext, useEffect, useRef } from 'react';

const CartContext = createContext();

const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { items: [] };
};

const saveCartToLocalStorage = (state) => {
    localStorage.setItem('cart', JSON.stringify(state));
};

const initialState = getCartFromLocalStorage();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { id, size, color, quantity } = action.payload; 
            const existingItemIndex = state.items.findIndex(item =>
                item.id === id && item.size === size && item.color === color
            );
        
            if (existingItemIndex > -1) {
                // Item exists, increase the quantity
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity // Use the incoming quantity
                };
                return { ...state, items: updatedItems };
            } else {
                // Item does not exist, add new item
                return { ...state, items: [...state.items, { ...action.payload, quantity }] }; // Use the incoming quantity
            }
        }
            
        case 'INCREASE_QUANTITY': {
            const { id, size, color } = action.payload;
            const updatedItems = state.items.map(item =>
                item.id === id && item.size === size && item.color === color
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            return { ...state, items: updatedItems };
        }
        case 'DECREASE_QUANTITY': {
            const { id, size, color } = action.payload;
            const updatedItems = state.items.map(item =>
                item.id === id && item.size === size && item.color === color && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            return { ...state, items: updatedItems };
        }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        default:
            return state;
    }
};



export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (hasMounted.current) {
            saveCartToLocalStorage(state);
        } else {
            hasMounted.current = true;
        }
    }, [state]);

    const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    return (
        <CartContext.Provider value={{ state, dispatch, addItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
