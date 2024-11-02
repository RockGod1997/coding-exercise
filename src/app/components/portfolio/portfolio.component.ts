import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { AssetSelectionComponent } from "../asset-selection/asset-selection.component";
import { PortfolioSummaryComponent } from "../portfolio-summary/portfolio-summary.component";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Asset } from '../../models';
import { PortfolioState, selectAllAssets } from '../../store';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [MatTabsModule, AssetSelectionComponent, PortfolioSummaryComponent, CommonModule, MatTableModule, AgGridAngular],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  private store = inject(Store<PortfolioState>); // Inject the NgRx store
  assets$: Observable<Asset[]> = this.store.select(selectAllAssets); // Observable to get assets from store
 
  //define the Table Header
  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Asset Name', sortable: true, filter: false },
    { field: 'allocation', headerName: 'Allocation (%)', sortable: true, filter: false, valueFormatter: params => `${params.value}%` }
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: false,
  };
}