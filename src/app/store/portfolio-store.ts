import { Asset } from '../models';

export interface PortfolioState {
  assets: Asset[];
  totalAllocation: number;
  message?:string
}

//initialise store
export const initialPortfolioState: PortfolioState = {
  assets: [],
  totalAllocation: 0,
  message:''
};

