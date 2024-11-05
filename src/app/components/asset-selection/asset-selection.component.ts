import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addAsset, messageAction, selectTotalAllocation } from '../../store';
import { PortfolioState } from '../../store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable, take } from 'rxjs';
import { Asset, limitBreached } from '../../models';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-asset-selection',
  templateUrl: './asset-selection.component.html',
  standalone: true,
  styleUrl: './asset-selection.component.scss',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule]
})
export class AssetSelectionComponent {
  @ViewChild('form') form!: NgForm;
  assetForm: FormGroup;
  private store = inject(Store<PortfolioState>); // Inject the NgRx Store with the PortfolioState

  constructor() {
    const fb = inject(FormBuilder);  // Inject formbuilder for Reactive form
    this.assetForm = fb.group({
      name: ['', Validators.required],
      allocation: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  // Adds asset to the store
  addAsset() {
    const asset: Asset = this.assetForm.value;
    this.store.select(selectTotalAllocation).pipe(take(1)).subscribe((totalAllocation) => {
      if (totalAllocation + asset.allocation > 100) { // Check if total allocation exceeds the limit
        this.store.dispatch(messageAction({ message: limitBreached }));
        return;
      }
    })
    this.store.dispatch(addAsset({ asset }));

    // Reset the form
    this.assetForm.reset();
    this.form.resetForm();
  }
}