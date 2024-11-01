import { Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { AssetSelectionComponent } from "../asset-selection/asset-selection.component";
import { PortfolioSummaryComponent } from "../portfolio-summary/portfolio-summary.component";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Asset } from '../../models';
import { PortfolioState, selectAllAssets, selectTotalAllocation } from '../../store';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-portfolio',
  standalone:true,
  imports: [MatTabsModule, AssetSelectionComponent, PortfolioSummaryComponent,CommonModule,MatTableModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  private store = inject(Store<PortfolioState>);
  displayedColumns: string[] = ['name', 'allocation'];
  assets$: Observable<Asset[]> = this.store.select(selectAllAssets);
}