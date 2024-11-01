import { createAction, props } from '@ngrx/store';
import { Asset } from '../models';

export const addAsset = createAction('[Portfolio] Add Asset', props<{ asset: Asset }>());
export const resetPortfolio = createAction('[Portfolio] Reset Portfolio');
export const savePortfolio = createAction('[Portfolio] Save Portfolio');
export const loadPortfolio = createAction('[Portfolio] Load Portfolio', props<{ assets: Asset[]; totalAllocation: number }>());