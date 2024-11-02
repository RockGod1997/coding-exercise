import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioComponent } from './portfolio.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  const initialState = { assets: [], totalAllocation: 0 };
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent,BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState })]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
