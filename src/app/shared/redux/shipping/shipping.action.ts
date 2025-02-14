import { createAction, props } from '@ngrx/store';
import { ShippingAddress } from './shipping.model';

export const updateShippingAddress = createAction(
  '[Shipping] Update Address',
  props<{ address: ShippingAddress }>()
);

export const loadShippingAddress = createAction('[Shipping] Load Address');

export const clearShippingAddress = createAction('[Shipping] Clear Shipping Address');