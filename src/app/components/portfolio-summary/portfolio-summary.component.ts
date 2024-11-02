import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetPortfolio, savePortfolio } from '../../store/portfolio-action';
import { selectTotalAllocation } from '../../store';
import { Observable } from 'rxjs';
import { PortfolioState } from '../../store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrl: './portfolio-summary.component.scss',
  standalone: true,
  imports: [MatButtonModule, CommonModule]
})
export class PortfolioSummaryComponent {
  private store = inject(Store<PortfolioState>); // Inject the NgRx Store with the PortfolioState
  totalAllocation$: Observable<number> = this.store.select(selectTotalAllocation); // Observable to get the total allocation percentage

  savePortfolio() {
    this.store.dispatch(savePortfolio()); // Dispatches the savePortfolio action
  }

  resetPortfolio() {
    this.store.dispatch(resetPortfolio()); // Dispatches the resetPortfolio action
  }
}