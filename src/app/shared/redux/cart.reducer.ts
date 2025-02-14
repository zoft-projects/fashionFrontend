import { createReducer, on } from '@ngrx/store';
import { addToCart, clearCart, loadCart, removeFromCart } from './cart.actions';
import { CartProduct } from './cart.model';

export interface CartState {
  items: CartProduct[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'), 
};

export const cartReducer = createReducer(
  initialState,

  on(loadCart, (state) => ({
    ...state,
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
  })),

  on(addToCart, (state, { product }) => {
    const existingProduct = state.items.find((item) => item.productId === product.productId);

    let updatedItems;
    if (existingProduct) {
      updatedItems = state.items.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
    } else {
      updatedItems = [...state.items, product];
    }

    localStorage.setItem('cart', JSON.stringify(updatedItems)); 
    return { ...state, items: updatedItems };
  }),

  on(removeFromCart, (state, { productId }) => {
    const updatedItems = state.items.filter((item) => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Persist updated cart
    return { ...state, items: updatedItems };
  }),
  on(clearCart,()=>{
    localStorage.removeItem('cart'); 
    return { items: [] };
  })
);
