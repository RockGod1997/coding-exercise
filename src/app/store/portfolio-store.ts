import { Asset } from '../models';

export interface PortfolioState {
  assets: Asset[];
  totalAllocation: number;
}

export const initialPortfolioState: PortfolioState = {
  assets: [],
  totalAllocation: 0
};

