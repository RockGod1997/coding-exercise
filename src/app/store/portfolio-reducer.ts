import { createReducer, on } from '@ngrx/store';
import { addAsset, loadPortfolio, resetPortfolio} from './portfolio-action';
import { initialPortfolioState } from './portfolio-store';

export const portfolioReducer = createReducer(
  initialPortfolioState,
  on(addAsset, (state, { asset }) => { // adds assets to the store
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
  on(resetPortfolio, () => initialPortfolioState), // resets the store
  on(loadPortfolio, (state, { assets, totalAllocation }) => ({ // loads the store 
    ...state,
    assets,
    totalAllocation
  })
  ));