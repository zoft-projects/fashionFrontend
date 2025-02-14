import { createAction, props } from '@ngrx/store';

export type PaymentMethod = 'cod' | 'paypal' | null;

export const updatePaymentStatus = createAction(
  '[Payment] Update Payment Status',
  props<{ paymentStatus: PaymentMethod }>()
);


export const clearPaymentStatus = createAction('[Payment] Clear Payment Status');