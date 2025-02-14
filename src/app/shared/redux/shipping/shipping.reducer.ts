import { createReducer, on } from '@ngrx/store';
import { ShippingAddress } from './shipping.model';
import { loadShippingAddress, updateShippingAddress } from './shipping.action';

export interface ShippingState {
  address: ShippingAddress | null;
}

const initialState: ShippingState = {
  address: JSON.parse(localStorage.getItem('shippingAddress') || 'null'),
};

export const shippingReducer = createReducer(
  initialState,

  on(loadShippingAddress, (state) => ({
    ...state,
    address: JSON.parse(localStorage.getItem('shippingAddress') || 'null'),
  })),

  on(updateShippingAddress, (state, { address }) => {
    localStorage.setItem('shippingAddress', JSON.stringify(address)); 
    return { ...state, address };
  })
);
