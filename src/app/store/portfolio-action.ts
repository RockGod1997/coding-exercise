import { createAction, props } from '@ngrx/store';
import { Asset } from '../models';

export const addAsset = createAction('Add Asset', props<{ asset: Asset }>());
export const resetPortfolio = createAction('Reset Portfolio');
export const savePortfolio = createAction('Save Portfolio');
export const loadPortfolio = createAction('Load Portfolio', props<{ assets: Asset[]; totalAllocation: number }>());
export const messageAction = createAction('Message', props<{ message: string }>());