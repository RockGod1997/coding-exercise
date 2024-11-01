import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectAllAssets, selectTotalAllocation } from './portfolio-selector';
import {  map, tap, withLatestFrom } from 'rxjs/operators';
import { PortfolioState } from './portfolio-store';
import { savePortfolio, resetPortfolio, loadPortfolio } from './portfolio-action';

@Injectable()
export class PortfolioEffects {
  actions$ = inject(Actions);
  store=inject(Store<PortfolioState>)
  // Effect to save portfolio to localStorage when 'savePortfolio' action is dispatched
  savePortfolio$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(savePortfolio),
        withLatestFrom(this.store.select(selectAllAssets), this.store.select(selectTotalAllocation)),
        tap(([_, assets, totalAllocation]) => {
          localStorage.setItem('portfolioAssets', JSON.stringify(assets));
          localStorage.setItem('portfolioTotalAllocation', JSON.stringify(totalAllocation));
          console.log('Portfolio saved to localStorage');
        })
      ),
    { dispatch: false } // No further action dispatched
  );

  // Effect to load portfolio from localStorage when the app starts
  loadPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType('@ngrx/effects/init'), // This triggers on app initialization
      map(() => {
        const savedAssets = localStorage.getItem('portfolioAssets');
        const savedTotalAllocation = localStorage.getItem('portfolioTotalAllocation');

        if (savedAssets && savedTotalAllocation) {
          const assets = JSON.parse(savedAssets);
          const totalAllocation = JSON.parse(savedTotalAllocation);
          return loadPortfolio({ assets, totalAllocation });
        } else {
          return { type: '[Portfolio] No Load Needed' }; // Return a dummy action if no data found
        }
      })
    )
  );

  // Effect to clear the localStorage on resetPortfolio
  resetPortfolio$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetPortfolio),
        tap(() => {
          localStorage.removeItem('portfolioAssets');
          localStorage.removeItem('portfolioTotalAllocation');
          console.log('Portfolio cleared from localStorage');
        })
      ),
    { dispatch: false }
  );
}