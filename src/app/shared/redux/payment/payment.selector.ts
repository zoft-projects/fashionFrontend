import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentState } from './payment.reducer';

export const selectPaymentState = createFeatureSelector<PaymentState>('payment');

export const selectPaymentStatus = createSelector(
  selectPaymentState,
  (state: PaymentState) => state.paymentStatus
);
