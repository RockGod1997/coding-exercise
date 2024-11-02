import { Component, inject, ViewChild} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addAsset, selectTotalAllocation } from '../../store';
import { PortfolioState } from '../../store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Asset } from '../../models';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-asset-selection',
  templateUrl: './asset-selection.component.html',
  standalone: true,
  styleUrl:'./asset-selection.component.scss',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule]
})
export class AssetSelectionComponent {
  @ViewChild('form') form!: NgForm;
  assetForm: FormGroup;
  private store = inject(Store<PortfolioState>); // Inject the NgRx Store with the PortfolioState
  totalAllocation = 0;
  limitBreached = false;
  allocation$: Observable<number> = this.store.select(selectTotalAllocation) // Observable to get the total allocation percentage

  constructor() {
    const fb = inject(FormBuilder);  // Inject formbuilder for Reactive form
    this.assetForm = fb.group({
      name: ['', Validators.required],
      allocation: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    });

    this.allocation$.subscribe(value => {
      this.totalAllocation = value;

    });
  }

  // Adds asset to the store
  addAsset() {
    if (this.totalAllocation + this.assetForm.get('allocation')?.value > 100) {
      this.limitBreached = true;
      return;
    }
    const asset: Asset = this.assetForm.value;
    this.store.dispatch(addAsset({ asset }));
    this.limitBreached = false;
    this.assetForm.reset(); // Reset the form
    this.form.resetForm();
  }
}