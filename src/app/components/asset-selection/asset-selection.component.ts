import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addAsset, selectTotalAllocation } from '../../store';
import { PortfolioState } from '../../store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription } from 'rxjs';
import { Asset } from '../../models';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-asset-selection',
  templateUrl: './asset-selection.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule]
})
export class AssetSelectionComponent {
  assetForm: FormGroup;
  private store = inject(Store<PortfolioState>);
  totalAllocation = 0;
  limitBreached = false;
  allocation$: Observable<number> = this.store.select(selectTotalAllocation)

  constructor() {
    const fb = inject(FormBuilder);
    this.assetForm = fb.group({
      name: ['', Validators.required],
      allocation: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    });

    this.allocation$.subscribe(value => {
      this.totalAllocation = value;

    });
  }

  addAsset() {
    if (this.totalAllocation + this.assetForm.get('allocation')?.value > 100) {
      this.limitBreached = true;
      return;
    }
    const asset: Asset = this.assetForm.value;
    this.store.dispatch(addAsset({ asset }));
    this.assetForm.reset({ name: ' ', allocation: 1 });
  }
}