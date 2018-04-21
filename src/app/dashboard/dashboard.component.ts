import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user:object;
  constructor(private apiService:ApiService) {
    /**
     * Get the current user
     */
    apiService.getUser().then(data => {
      this.user = data;
    })
    .catch(err => {})
  }

  ngOnInit() {}

}
