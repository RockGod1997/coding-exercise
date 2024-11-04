import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioComponent } from './portfolio.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectAllAssets, selectMessage } from '../../store';
describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  const initialState = { assets: [], totalAllocation: 0,message:'' };
  let store: MockStore;
  let snackBar:MatSnackBar;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent,BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } }] // Mocks MatSnackBar
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    snackBar = TestBed.inject(MatSnackBar);

    // Set up selectors
    store.overrideSelector(selectAllAssets, initialState.assets);
    store.overrideSelector(selectMessage, initialState.message);
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the snackbar when message$ emits a value', () => {
    // Set up the message observable
    const testMessage = 'New Test Message';
    store.overrideSelector(selectMessage, testMessage);
    store.refreshState();
    fixture.detectChanges();

    // Check that the snackBar open method was called
    expect(snackBar.open).toHaveBeenCalledWith(testMessage, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  });
});
