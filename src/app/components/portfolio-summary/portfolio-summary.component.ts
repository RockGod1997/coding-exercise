// src/app/components/portfolio-summary/portfolio-summary.component.ts
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetPortfolio, savePortfolio } from '../../store/portfolio-action';
import { selectAllAssets, selectTotalAllocation } from '../../store';
import { Observable } from 'rxjs';
import { Asset } from '../../models/asset.model';
import { PortfolioState } from '../../store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  standalone: true,
  imports: [MatButtonModule, CommonModule]
})
export class PortfolioSummaryComponent {
  private store = inject(Store<PortfolioState>);
  totalAllocation$: Observable<number> = this.store.select(selectTotalAllocation);

  savePortfolio() {
    this.store.dispatch(savePortfolio());
  }

  resetPortfolio() {
    this.store.dispatch(resetPortfolio());
  }
}