import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioComponent } from "./components/portfolio/portfolio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortfolioComponent],
  template:`<app-portfolio></app-portfolio>`

})
export class AppComponent {
  title = 'coding-excerise';
}
