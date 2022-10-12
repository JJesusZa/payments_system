import { Component } from '@angular/core';
import { GetServiceService } from './data/get-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private get: GetServiceService) {}

  ngOnInit() {
  }
}
