import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { addAsset, messageAction } from '../../store';
import { selectTotalAllocation } from '../../store';
import { Asset } from '../..//models';
import { AssetSelectionComponent } from './asset-selection.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AssetSelectionComponent', () => {
  let component: AssetSelectionComponent;
  let fixture: ComponentFixture<AssetSelectionComponent>;
  let store: MockStore;
  let fb: FormBuilder;

  const initialState = { assets: [], totalAllocation: 0 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AssetSelectionComponent,BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        FormBuilder
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fb = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(AssetSelectionComponent);
    component = fixture.componentInstance;

    store.overrideSelector(selectTotalAllocation, 0); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the asset form with default values', () => {
    const nameControl = component.assetForm.get('name');
    const allocationControl = component.assetForm.get('allocation');

    expect(nameControl?.value).toBe('');
    expect(allocationControl?.value).toBe(null);
  });

  it('should dispatch message if total allocation exceeds 100%', () => {
    // Set total allocation to 90% to simulate nearing the limit
    store.overrideSelector(selectTotalAllocation, 90);
    store.refreshState();
    const dispatchSpy = spyOn(store, 'dispatch');
    // Set form values that will exceed the limit
    component.assetForm.setValue({ name: 'Test Asset', allocation: 20 });
    component.addAsset();
    expect(dispatchSpy).toHaveBeenCalledWith(messageAction({message:'Total allocation limit exceeded 100%.'}))
    expect(component.assetForm.valid).toBeTrue();
  });

  it('should dispatch addAsset action when form is valid and within limit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    
    component.assetForm.setValue({ name: 'Test Asset', allocation: 10 });
    component.addAsset();

    // Verify that addAsset action is dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(addAsset({ asset: { name: 'Test Asset', allocation: 10 } as Asset }));
  });

  it('should reset form and set default values after adding an asset', () => {
    component.assetForm.setValue({ name: 'Test Asset', allocation: 10 });
    component.addAsset();

    // Check that form resets to the default values
    expect(component.assetForm.get('name')?.value).toBe(null);
    expect(component.assetForm.get('allocation')?.value).toBe(null);
  });
});