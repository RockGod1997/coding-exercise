import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectAllAssets, selectTotalAllocation } from './portfolio-selector';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { PortfolioState } from './portfolio-store';
import { savePortfolio, resetPortfolio, loadPortfolio, messageAction } from './portfolio-action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { portfolioReset, portfolioSaved } from '../models';

@Injectable()
export class PortfolioEffects {
  actions$ = inject(Actions);
  store = inject(Store<PortfolioState>)
  snackBar = inject(MatSnackBar)

  // Effect to save portfolio to localStorage on savePortfolio
  savePortfolio$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(savePortfolio),
        withLatestFrom(this.store.select(selectAllAssets), this.store.select(selectTotalAllocation)),
        map(([_, assets, totalAllocation]) => {
          localStorage.setItem('portfolioAssets', JSON.stringify(assets));
          localStorage.setItem('portfolioTotalAllocation', JSON.stringify(totalAllocation));
          return messageAction({ message: portfolioSaved });
        })
      )
  );

  // Effect to load portfolio from localStorage when the app starts
  loadPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType('@ngrx/effects/init'), //  triggers on app initialization
      map(() => {
        const savedAssets = localStorage.getItem('portfolioAssets');
        const savedTotalAllocation = localStorage.getItem('portfolioTotalAllocation');

        if (savedAssets && savedTotalAllocation) {
          const assets = JSON.parse(savedAssets);
          const totalAllocation = JSON.parse(savedTotalAllocation);
          console.log('Portfolio loaded from local Storage');
          return loadPortfolio({ assets, totalAllocation });
        } else {
          return { type: 'No Load Needed' };
        }
      })
    )
  );

  // Effect to clear the localStorage on resetPortfolio
  resetPortfolio$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetPortfolio),
        map(() => {
          localStorage.removeItem('portfolioAssets');
          localStorage.removeItem('portfolioTotalAllocation');
          return messageAction({ message: portfolioReset });
        })
      )
  );

  // Effect to open SnackBar when a message is dispatched
  showSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(messageAction),
        tap((action) => {
          if (action.message) {
            this.snackBar.open(action.message, 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        })
      ),
    { dispatch: false }
  );
}