import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ShippingState } from './shipping.reducer';

export const selectShippingFeature = createFeatureSelector<ShippingState>('shipping');

export const selectShippingAddress = createSelector(
  selectShippingFeature,
  (state: ShippingState) => state.address
);
