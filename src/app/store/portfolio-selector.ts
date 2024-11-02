import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio-store';

export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

export const selectAllAssets = createSelector( // returns assets
  selectPortfolioState,
  (state: PortfolioState) => state?.assets
);

export const selectTotalAllocation = createSelector( // returns total allocation
  selectPortfolioState,
  (state: PortfolioState) => state?.totalAllocation
);