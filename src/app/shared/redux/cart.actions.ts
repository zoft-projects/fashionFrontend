import { createAction, props } from '@ngrx/store';
import { CartProduct } from './cart.model';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: CartProduct }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: string }>()
);

export const loadCart = createAction('[Cart] Load Cart from Storage');

export const clearCart = createAction('[Cart] Clear Cart');