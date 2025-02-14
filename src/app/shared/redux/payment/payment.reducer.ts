import { createReducer, on } from '@ngrx/store';
import { updatePaymentStatus } from './payment.actions';

export type PaymentMethod = 'cod' | 'paypal' | null;


export interface PaymentState {
    paymentStatus: PaymentMethod;
  }
  
  const initialState: PaymentState = {
    paymentStatus: 'cod', 
  };

export const paymentReducer = createReducer(
  initialState,
  on(updatePaymentStatus, (state, { paymentStatus }) => ({
    ...state,
    paymentStatus,
  }))
);
