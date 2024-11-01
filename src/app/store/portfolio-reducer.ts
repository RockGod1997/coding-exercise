import { createReducer, on } from '@ngrx/store';
import { addAsset, loadPortfolio, resetPortfolio, savePortfolio } from './portfolio-action';
import { initialPortfolioState } from './portfolio-store';

export const portfolioReducer = createReducer(
  initialPortfolioState,
  on(addAsset, (state, { asset }) => {
    const newTotalAllocation = state.totalAllocation + asset.allocation;

    if (newTotalAllocation > 100) {
      return state;
    }

    return {
      ...state,
      assets: [...state.assets, asset],
      totalAllocation: newTotalAllocation
    };
  }),
  on(resetPortfolio, () => initialPortfolioState),
  on(loadPortfolio, (state, { assets, totalAllocation }) => ({
    ...state,
    assets,
    totalAllocation
  }))
);