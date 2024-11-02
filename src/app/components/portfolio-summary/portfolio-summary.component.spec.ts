import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioSummaryComponent } from './portfolio-summary.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { resetPortfolio, savePortfolio } from '../../store';
describe('PortfolioSummaryComponent', () => {
  let component: PortfolioSummaryComponent;
  let fixture: ComponentFixture<PortfolioSummaryComponent>;
  const initialState = { assets: [], totalAllocation: 0 };
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSummaryComponent,BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState })]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PortfolioSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch savePortfolio action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.savePortfolio();
    // Verify that savePortfolio action is dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(savePortfolio());
  });

  it('should dispatch resetPortfolio action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.resetPortfolio();
    // Verify that resetPortfolio action is dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(resetPortfolio());
  });
});
