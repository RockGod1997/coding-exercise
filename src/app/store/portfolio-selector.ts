import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio-store';

export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

export const selectAllAssets = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state?.assets
);

export const selectTotalAllocation = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state?.totalAllocation
);